import React, {useEffect, useState} from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import ResumeRenderer from '../components/ResumeRenderer';

function ResumePage(props) {
  const { match } = props;
  const { params: { file } } = match;
  const [pageData, setPageData] = useState({ loading: true, resume: null, error: null });

  useEffect(() => {
    // on mount and update
    async function getResume(fileParam){
      let loading = true, resume = null, error = null;
      setPageData({ loading, resume, error });
      try {
        const response = await fetch('/api/cv/' + fileParam);
        const body = await response.json();
        resume = body.data;
        loading = false;
      } catch (err) {
        error = err.message
      }
      setPageData({ loading, resume, error });
    }

    getResume(file); // fire/forget

    return () => {
      // on unmount
    }
  }, [ file ]);

  const { loading, resume, error } = pageData;

  return (
    <>
      <DefaultLayout>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {resume && <ResumeRenderer resume={resume} />}
      </DefaultLayout>
    </>
  );
}

export default ResumePage;
