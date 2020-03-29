export function extractYear(str, pattern) {
  let result = null;
  if (str) {
    const found = String(str).match(pattern);
    if (found) {
      result = found[1];
    }
  }
  return result;
}

export function getYearList(Experience) {
  const yearList = {}; // unique year list
  const pattern = /([0-9]{4})$/; // 'YYYY'
  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      const { Start, End } = historyItem;
      const year1 = extractYear(Start, pattern);
      if (year1) yearList[year1] = year1;
      const year2 = End ? new Date().getFullYear() : extractYear(End, pattern);
      if (year2) yearList[year2] = year1;
    });
  });
  return Object.keys(yearList).sort((a, b) => b - a);
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
