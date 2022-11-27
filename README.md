# resume-time

Turn your resume into an interactive react web app using YAML format.

Inspired by:

https://jsonresume.org/schema/

https://github.com/gmantaos/yaml-cv

https://venngage.com/blog/infographic-resume-template/

https://visme.co/blog/infographic-resumes/

## installation

```sh
npm i
```

## configuration

Copy `.env.sample` as `.env` and edit.

Create directory `./data`

Touch `./data/db.sqlite3` for a small database to keep protected resumes table.

Copy `resume-sample.yaml`, edit and serve in your public github repo.

Check my CV repo here: https://github.com/muratyaman/cv

You can use your URL to register in resume app;
e.g. https://raw.githubusercontent.com/muratyaman/cv/master/haci.yaml

Then, you can share your resume URL: https://your-domain.com/resume/your-username

Here is mine: https://resume-time.muratyaman.co.uk/resume/haci

You can modify the styles of React components in `./src/components/resume/*.jsx`

```plain
AwardsHistoryItem.jsx
AwardsNode.jsx
EducationHistoryItem.jsx
EducationNode.jsx
ExperienceHistoryItem.jsx
ExperienceNode.jsx
ImageNode.jsx
IntroductionNode.jsx
LinkNode.jsx
LinksNode.jsx
NationalityNode.jsx
PlaceNode.jsx
ProfileNode.jsx
TrainingHistoryItem.jsx
TrainingNode.jsx
```

## build

Build static assets of app

```sh
npm run build
```

## start

```sh
npm run start:server
```

Go to http://localhost:43210/
