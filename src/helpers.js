export function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if(obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if(obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }

  if(obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    }, {})
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

export function getTagList(Experience) {
  const tagList = {}; // unique tag list

  const extractTags = (Tags) => {
    if (Tags) {
      const tagArr = String(Tags).split(',').map(t => String(t).trim());
      tagArr.forEach(tag => {
        if (!tagList[tag]) tagList[tag] = { tag, count: 0 }; // init
        tagList[tag].count += 1;
      });
    }
  };

  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      const { Tags } = historyItem;
      if (Tags) extractTags(Tags);
    });
  });

  return Object.entries(tagList).sort( // [k, v]
    (a, b) => {
      const val1 = a[1];
      const val2 = b[1];
      const val1Lower = val1.tag.toLowerCase();
      const val2Lower = val2.tag.toLowerCase();
      const strCompare = (val1Lower < val2Lower ? -1 : (val1Lower > val2Lower ? 1 : 0));
      return val1.count === val2.count ? strCompare : val2.count - val1.count;
    }).map(([k, v]) => v);
}

export function getTechList(Experience) {
  const techList = {}; // unique tech list

  const extractTechs = (Tech) => {
    if (Tech) {
      const techArr = String(Tech).split(',').map(t => String(t).trim());
      techArr.forEach(tech => {
        if (!techList[tech]) techList[tech] = { tech, count: 0 }; // init
        techList[tech].count += 1;
      });
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
        })
      }
    });
  });

  return Object.entries(techList).sort( // [k, v]
    (a, b) => {
      const val1 = a[1];
      const val2 = b[1];
      const val1Lower = val1.tech.toLowerCase();
      const val2Lower = val2.tech.toLowerCase();
      const strCompare = (val1Lower < val2Lower ? -1 : (val1Lower > val2Lower ? 1 : 0));
      return val1.count === val2.count ? strCompare : val2.count - val1.count;
    }).map(([k, v]) => v);
}

export const filterHistoryItem = (historyItem, years, currentYear) => {
  let { Date, Periods, Start, End = currentYear } = historyItem;
  let year;

  if (Date) {
    year = extractYear(Date);
    if (year) return years.includes(year);
  }

  if (Periods) {
    return Periods.filter(({ Start, End = currentYear }) => {
      if (End === defaultEndDate) End = currentYear;
      return years.filter(y => {
        const sd = extractYear(Start);
        const ed = extractYear(End);
        return sd && ed && sd <= y && y <= ed;
      }).length;
    }).length;
  }

  if (Start && End) {
    if (End === defaultEndDate) End = currentYear;
    const sd = extractYear(Start);
    const ed = extractYear(End);
    return sd && ed && years.filter(y => sd <= y && y <= ed).length;
  }

  return false; // unknown
};

export const extractOptions = (resume) => {
  const { Experience, Education, Training, Awards } = resume;

  const years1 = getYearListFromExperience(Experience);
  const years2 = getYearListFromHistory(Education.History);
  const years3 = getYearListFromHistory(Training.History);
  const years4 = getYearListFromHistory(Awards.History);
  const allYears = combineYears(years1, years2, years3, years4);
  const yearListOptions = allYears.map(year => ({
    key: year,
    text: year,
    value: year,
  }));

  const tagListOptions = getTagList(Experience).map(({ tag, count }) => ({
    key: tag,
    text: `${tag} (${count})`,
    value: tag,
  }));
  const techListOptions = getTechList(Experience).map(({ tech, count }) => ({
    key: tech,
    text: `${tech} (${count})`,
    value: tech,
  }));
  // TODO: extract job types
  const jobTypeListOptions = [{
    key: 'Permanent',
    text: 'Permanent',
    value: 'Permanent',
  }];
  return {
    yearListOptions,
    tagListOptions,
    techListOptions,
    jobTypeListOptions,
  }
};

export const filterResume = (resume, filters) => {
  let newResume = deepCopy(resume); // Object.assign({}, resume);
  let { Experience, Education, Training, Awards } = newResume;
  //const { years = [], tags = [], techs = [], jobTypes = [] } = filters; // TODO: use all filters
  const { years = [] } = filters;

  const currentYear = new Date().getFullYear();

  if (years && years.length) {
    newResume.Experience = Experience.map((experienceItem) => {
      const { History } = experienceItem;
      // side-effect
      experienceItem.History = History.filter(historyItem => filterHistoryItem(historyItem, years, currentYear));
      return experienceItem;
    });

    // side-effect
    newResume.Education.History = Education.History.filter(historyItem => filterHistoryItem(historyItem, years, currentYear));

    // side-effect
    newResume.Training.History = Training.History.filter(historyItem => filterHistoryItem(historyItem, years, currentYear));

    // side-effect
    newResume.Awards.History = Awards.History.filter(historyItem => filterHistoryItem(historyItem, years, currentYear));
  }

  return newResume;
};
