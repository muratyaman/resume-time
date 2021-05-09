export function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    }, {});
  }
}

const rangeArr = (from, to, step = 1) => Array.from({
    length: Math.floor((to - from) / step) + 1
  },
  (v, k) => from + k * step
);

export const monthYearPattern = /[A-Za-z]{3}\s([0-9]{4})$/; // 'MMM YYYY'
export const yearPattern = /([0-9]{4})$/; // 'YYYY'

export const defaultEndDate = 'Present';

export function extractYear(str) {
  let result = null, found;
  if (str) {
    found = String(str).match(monthYearPattern);
    if (found) return parseInt(found[1]);

    found = String(str).match(yearPattern);
    if (found) return parseInt(found[1]);
  }
  return result;
}

function convertToYearArray(yearSet) {
  const uniqueYears = Array.from(yearSet.values());

  const maxYear = Math.max.apply(null, uniqueYears);
  const minYear = Math.min.apply(null, uniqueYears);
  return rangeArr(maxYear, minYear, -1); // years without gaps
}

function addYearsFromHistoryItem(historyItem, yearSet, currentYear) {
  const { Date, Periods, Start, End = currentYear } = historyItem;
  let year;

  if (Date) {
    year = extractYear(Date);
    if (year) yearSet.add(year);
    return;
  }

  if (Periods) {
    Periods.forEach(({ Start, End = currentYear }) => {
      year = extractYear(Start);
      if (year) yearSet.add(year);
      year = End === defaultEndDate ? currentYear : extractYear(End);
      if (year) yearSet.add(year);
    });
    return;
  }

  if (Start && End) {
    year = extractYear(Start);
    if (year) yearSet.add(year);
    year = End === defaultEndDate ? currentYear : extractYear(End);
    if (year) yearSet.add(year);
  }
}

export function getYearListFromExperience(Experience) {
  const yearSet = new Set(); // unique year list
  const currentYear = new Date().getFullYear();
  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      addYearsFromHistoryItem(historyItem, yearSet, currentYear);
    });
  });
  return convertToYearArray(yearSet);
}

export function getYearListFromHistory(History) {
  const yearSet = new Set(); // unique year list
  const currentYear = new Date().getFullYear();
  History.forEach(historyItem => {
    addYearsFromHistoryItem(historyItem, yearSet, currentYear);
  });
  return convertToYearArray(yearSet);
}

export function combineYears(...yearArrays) {
  const yearSet = new Set();
  yearArrays.forEach(yearArray => yearArray.forEach(y => yearSet.add(y)));
  return convertToYearArray(yearSet);
}

export function sortByEntriesOfCountAndName(a, b) {
  const val1 = a[1];
  const val2 = b[1];
  const val1Lower = val1.name.toLowerCase();
  const val2Lower = val2.name.toLowerCase();
  const strCompare = (val1Lower < val2Lower ? -1 : (val1Lower > val2Lower ? 1 : 0));
  return val1.count === val2.count ? strCompare : val2.count - val1.count;
}

function appendToList(item, itemList) {
  if (item) {
    const key = item.toUpperCase();
    if (!itemList[key]) itemList[key] = { name: item, count: 0 }; // init
    itemList[key].count += 1;
  }
}

export function getTagList(Experience) {
  const tagList = {}; // unique tag list

  const extractTags = (Tags) => {
    if (Tags) {
      const tagArr = String(Tags).split(',').map(t => String(t).trim());
      tagArr.forEach(tag => appendToList(tag, tagList));
    }
  };

  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      const { Tags } = historyItem;
      if (Tags) extractTags(Tags);
    });
  });

  return Object.entries(tagList).sort(sortByEntriesOfCountAndName).map(([k, v]) => v);
}

export function getTechList(Experience) {
  const techList = {}; // unique tech list

  const extractTechs = (Tech) => {
    if (Tech) {
      const techArr = String(Tech).split(',').map(t => String(t).trim());
      techArr.forEach(tech => appendToList(tech, techList));
    }
  };

  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      const { Tech, Projects } = historyItem;
      if (Tech) extractTechs(Tech);
      if (Projects) {
        Projects.forEach(project => {
          const { Tech } = project;
          if (Tech) extractTechs(Tech);
        });
      }
    });
  });

  return Object.entries(techList).sort(sortByEntriesOfCountAndName).map(([k, v]) => v);
}

export function getJobTypeList(Experience) {
  const jobTypeList = {}; // unique job type list

  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      const { Type } = historyItem;
      appendToList(Type, jobTypeList);
    });
  });

  return Object.entries(jobTypeList).sort(sortByEntriesOfCountAndName).map(([k, v]) => v);
}

export function getOrgListFromHistory(historyItem, orgList) {
  const { Org, Projects } = historyItem;

  appendToList(Org, orgList);

  if (Projects && Array.isArray(Projects) && Projects.length) {
    Projects.forEach(({ Org }) => appendToList(Org, orgList));
  }
}

export function getOrgList(Experience, HistoryItems = []) {
  const orgList = {}; // unique org list

  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => getOrgListFromHistory(historyItem, orgList));
  });

  HistoryItems.forEach(historyItem => getOrgListFromHistory(historyItem, orgList));

  return Object.entries(orgList).sort(sortByEntriesOfCountAndName).map(([k, v]) => v);
}

export function getPlaceListFromHistory(historyItem, placeList) {
  const { Place, Projects } = historyItem;

  appendToList(Place, placeList);

  if (Projects && Array.isArray(Projects) && Projects.length) {
    Projects.forEach(({ Place }) => appendToList(Place, placeList));
  }
}

export function getPlaceList(Experience, HistoryItems = []) {
  const placeList = {}; // unique place list

  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => getPlaceListFromHistory(historyItem, placeList));
  });

  HistoryItems.forEach(historyItem => getPlaceListFromHistory(historyItem, placeList));

  return Object.entries(placeList).sort(sortByEntriesOfCountAndName).map(([k, v]) => v);
}

export const filterHistoryItemByYears = (historyItem, years, currentYear) => {
  let { Date, Periods, Start, End = currentYear } = historyItem;
  let year;

  if (Date) {
    year = extractYear(Date);
    if (year) return years.includes(year);
  }

  if (Periods) {
    return Periods.some(({ Start, End = currentYear }) => {
      if (End === defaultEndDate) End = currentYear;
      return years.some(y => {
        const sd = extractYear(Start);
        const ed = extractYear(End);
        return sd && ed && sd <= y && y <= ed;
      });
    });
  }

  if (Start && End) {
    if (End === defaultEndDate) End = currentYear;
    const sd = extractYear(Start);
    const ed = extractYear(End);
    return sd && ed && years.some(y => sd <= y && y <= ed);
  }

  return false;
};

export const filterHistoryItemByTags = (historyItem, tags = []) => {
  let { Tags } = historyItem;

  if (Tags) {
    const TagsArr = Tags.split(',').map(t => t.trim().toUpperCase());
    return TagsArr.some(tag => tags.includes(tag));
  }

  return false;
};

export const filterHistoryItemByTechs = (historyItem, techs = []) => {
  let { Tech, Projects } = historyItem;
  let foundInTech = false;

  if (Tech) {
    const TechArr = Tech.split(',').map(t => t.trim().toUpperCase());
    foundInTech = TechArr.some(tech => techs.includes(tech));
    if (foundInTech) return foundInTech; // short-cut
  }

  if (Projects && Array.isArray(Projects) && Projects.length) {
    return Projects.filter(({ Tech }) => {
      if (Tech) {
        const TechArr = Tech.split(',').map(t => t.trim().toUpperCase());
        return TechArr.some(tech => techs.includes(tech));
      }
      return false;
    })
  }

  return false;
};

// process Experience History items
export const filterHistoryItemByJobTypes = (historyItem, jobTypes = []) => {
  let { Type } = historyItem;
  if (Type) {
    const typeUpper = Type.toUpperCase();
    return jobTypes.includes(typeUpper);
  }
  return false;
};

export const filterHistoryItemByOrgs = (historyItem, orgs = []) => {
  let { Org, Projects } = historyItem;
  let foundOrg = false;
  if (Org) {
    const orgUpper = Org.toUpperCase();
    foundOrg = orgs.includes(orgUpper);
    if (foundOrg) return foundOrg; // short-cut
  }

  if (Projects && Array.isArray(Projects) && Projects.length) {
    return Projects.some(({ Org }) => {
      if (Org) {
        const orgUpper = Org.toUpperCase();
        return orgs.includes(orgUpper);
      }
      return false;
    });
  }

  return false;
};

export const filterHistoryItemByPlaces = (historyItem, places = []) => {
  let { Place, Projects } = historyItem;
  let found = false;
  if (Place) {
    const placeUpper = Place.toUpperCase();
    found = places.includes(placeUpper);
    if (found) return found; // short-cut
  }

  if (Projects && Array.isArray(Projects) && Projects.length) {
    return Projects.some(({ Place }) => {
      if (Place) {
        const placeUpper = Place.toUpperCase();
        return places.includes(placeUpper);
      }
      return false;
    });
  }

  return false;
};

export const makeListOptionFromYear = (year) => ({ key: year, text: year, value: year });

export const makeListOptionFromNameAndCount = ({ name, count }) => ({
  key: name,
  text: `${name} (${count})`,
  value: name,
});

export const extractOptions = (resume) => {
  const { Experience, Education, Training, Awards } = resume;
  const historyItems = [
    ...Education.History,
    ...Training.History,
    ...Awards.History,
  ];
  const years1 = getYearListFromExperience(Experience);
  const years2 = getYearListFromHistory(Education.History);
  const years3 = getYearListFromHistory(Training.History);
  const years4 = getYearListFromHistory(Awards.History);
  const allYears = combineYears(years1, years2, years3, years4);
  const yearListOptions = allYears.map(makeListOptionFromYear);
  const tagListOptions = getTagList(Experience).map(makeListOptionFromNameAndCount);
  const techListOptions = getTechList(Experience).map(makeListOptionFromNameAndCount);
  const jobTypeListOptions = getJobTypeList(Experience).map(makeListOptionFromNameAndCount);
  const orgListOptions = getOrgList(Experience, historyItems).map(makeListOptionFromNameAndCount);
  const placeListOptions = getPlaceList(Experience, historyItems).map(makeListOptionFromNameAndCount);
  return {
    yearListOptions,
    tagListOptions,
    techListOptions,
    jobTypeListOptions,
    orgListOptions,
    placeListOptions,
  }
};

export const filterResume = (resume, filters) => {
  console.log('filterResume', filters);
  let newResume = deepCopy(resume);
  let { Experience, Education, Training, Awards } = newResume;
  const { years = [], tags = [], techs = [], jobTypes = [], orgs = [], places = [] } = filters;

  const currentYear = new Date().getFullYear();

  if (years && years.length) {
    if (Experience && Experience.length) {
      newResume.Experience = Experience.map((experienceItem) => {
        experienceItem.History = experienceItem.History.filter(historyItem => {
          return filterHistoryItemByYears(historyItem, years, currentYear);
        });
        return experienceItem;
      });
    }

    if (Education && Education.History) {
      newResume.Education.History = Education.History.filter(historyItem => {
        return filterHistoryItemByYears(historyItem, years, currentYear);
      });
    }

    if (Training && Training.History) {
      newResume.Training.History = Training.History.filter(historyItem => {
        return filterHistoryItemByYears(historyItem, years, currentYear);
      });
    }

    if (Awards && Awards.History) {
      newResume.Awards.History = Awards.History.filter(historyItem => {
        return filterHistoryItemByYears(historyItem, years, currentYear);
      });
    }
  }

  if (tags && tags.length && newResume.Experience && newResume.Experience.length) {
      const tagsUpper = tags.map(t => t.toUpperCase()); // for case-insensitive match
      newResume.Experience = newResume.Experience.map((experienceItem) => {
        experienceItem.History = experienceItem.History.filter(historyItem => {
          return filterHistoryItemByTags(historyItem, tagsUpper);
        });
        return experienceItem;
      });
  }

  if (techs && techs.length && newResume.Experience && newResume.Experience.length) {
    const techsUpper = techs.map(t => t.toUpperCase()); // for case-insensitive match
    newResume.Experience = newResume.Experience.map((experienceItem) => {
      experienceItem.History = experienceItem.History.filter(historyItem => {
        return filterHistoryItemByTechs(historyItem, techsUpper);
      });
      return experienceItem;
    });
  }

  if (jobTypes && jobTypes.length && newResume.Experience && newResume.Experience.length) {
    const jobTypesUpper = jobTypes.map(t => t.toUpperCase()); // for case-insensitive match
    newResume.Experience = newResume.Experience.map((experienceItem) => {
      experienceItem.History = experienceItem.History.filter(historyItem => {
        return filterHistoryItemByJobTypes(historyItem, jobTypesUpper);
      });
      return experienceItem;
    });
  }

  if (orgs && orgs.length) {
    const orgsUpper = orgs.map(o => o.toUpperCase()); // for case-insensitive match

    if (newResume.Experience && newResume.Experience.length) {
      newResume.Experience = newResume.Experience.map((experienceItem) => {
        experienceItem.History = experienceItem.History.filter(historyItem => {
          return filterHistoryItemByOrgs(historyItem, orgsUpper);
        });
        return experienceItem;
      });
    }

    if (newResume.Education.History && newResume.Education.History.length) {
      newResume.Education.History = newResume.Education.History.filter(historyItem => {
        return filterHistoryItemByOrgs(historyItem, orgsUpper);
      });
    }

    if (newResume.Training.History && newResume.Training.History.length) {
      newResume.Training.History = newResume.Training.History.filter(historyItem => {
        return filterHistoryItemByOrgs(historyItem, orgsUpper);
      });
    }

    if (newResume.Awards.History && newResume.Awards.History.length) {
      newResume.Awards.History = newResume.Awards.History.filter(historyItem => {
        return filterHistoryItemByOrgs(historyItem, orgsUpper);
      });
    }
  }

  if (places && places.length) {
    const placesUpper = places.map(p => p.toUpperCase()); // for case-insensitive match

    if (newResume.Experience && newResume.Experience.length) {
      newResume.Experience = newResume.Experience.map((experienceItem) => {
        experienceItem.History = experienceItem.History.filter(historyItem => {
          return filterHistoryItemByPlaces(historyItem, placesUpper);
        });
        return experienceItem;
      });
    }

    if (newResume.Education.History && newResume.Education.History.length) {
      newResume.Education.History = newResume.Education.History.filter(historyItem => {
        return filterHistoryItemByPlaces(historyItem, placesUpper);
      });
    }

    if (newResume.Training.History && newResume.Training.History.length) {
      newResume.Training.History = newResume.Training.History.filter(historyItem => {
        return filterHistoryItemByPlaces(historyItem, placesUpper);
      });
    }

    if (newResume.Awards.History && newResume.Awards.History.length) {
      newResume.Awards.History = newResume.Awards.History.filter(historyItem => {
        return filterHistoryItemByPlaces(historyItem, placesUpper);
      });
    }
  }

  return newResume;
};
