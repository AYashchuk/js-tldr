import React, { useEffect, useState } from 'react';
import urlJoin from 'url-join';

import Markdown from 'components/Markdown';
import { BoxOverlay } from 'components/BoxOverlay/BoxOverlay';
import { P } from 'components/Typography';

import { Feedback } from './Feedback';

const DOCFILE_EXTENSION = 'md';
export const Documentation = ({ match: { params } }) => {
  const { domain, method } = params;
  const [isLoading, setLoading] = useState(false);
  const [md, setMd] = useState(null);
  useEffect(() => {
    if (isLoading) return;

    setLoading(true);
    fetch(
      urlJoin(
        process.env.REACT_APP_DOCS_PATH,
        domain,
        `${method}.${DOCFILE_EXTENSION}`,
      ),
    )
      .then(rs => rs.text())
      .then(mdText => {
        setMd(mdText);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <BoxOverlay>
      {isLoading && <P>Loading...</P>}
      <Markdown source={md} />
      {!isLoading && <Feedback />}
    </BoxOverlay>
  );
};
