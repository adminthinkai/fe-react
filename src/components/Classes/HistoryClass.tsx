import React from 'react';
import { useGetHistoryClassQuery } from 'src/api/classesApi';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import Markdown from 'marked-react';

export type HistoryClassProps = {
  classId: string;
};

export const HistoryClass: React.FC<HistoryClassProps> = ({ classId }) => {
  const historyList = useGetHistoryClassQuery({ id: classId });

  if (!historyList.data) {
    return <LinearProgress />;
  }
  return (
    <div>
      {historyList.data.rows.map(el => (
        <Accordion key={el.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {moment(el.creationDate).format('YYYY-MM-DD HH:mm:ss')}
          </AccordionSummary>
          <AccordionDetails className="bg-green-50">
            <Markdown value={el.content} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
