import React from 'react';
// @mui
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Stack,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Fab,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { NAV } from '../../config';

import NameAccordion from './NameAccordion';

function SecondFilter(props) {
  const { onOpen, onClose, open, rooms, tags, nameFilter, setNameFilter, tagFilter, setTagFilter } =
    props;

  // const AccordionItem = () => (
  //   <Accordion>
  //     <AccordionSummary
  //       expandIcon={<ExpandMoreIcon />}
  //       aria-controls="panel1a-content"
  //       id="panel1a-header"
  //     >
  //       <Typography>Accordion 1</Typography>
  //     </AccordionSummary>
  //     <AccordionDetails>
  //       <Typography>
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
  //         malesuada lacus ex, sit amet blandit leo lobortis eget.
  //       </Typography>
  //     </AccordionDetails>
  //   </Accordion>
  // );

  const onChangeInName = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      props.setNameFilter((prev) => [...prev, name]);
    } else {
      props.setNameFilter((prev) => prev.filter((item) => item !== name));
    }
    console.log('nameOne: ', name);
    console.log('name: ', nameFilter);
  };

  const onChangeInTag = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      props.setTagFilter((prev) => [...prev, name]);
    } else {
      props.setTagFilter((prev) => prev.filter((item) => item !== name));
    }
    console.log('tagOne: ', name);
    console.log('tag: ', tagFilter);
  };

  return (
    <Stack>
      <Fab onClick={onOpen}>2차 필터</Fab>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2 }}
        >
          <Typography variant="subtitle1">2차 필터</Typography>

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2.5 }}>
            <Stack spacing={1}>
              이름 필터
              <FormGroup>
                {rooms.map((r, i) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox onChange={onChangeInName} name={r.roomName} />}
                      label={r.roomName}
                    />
                  );
                })}
              </FormGroup>
            </Stack>

            {/* <Stack spacing={1}>
              태그 필터
              <FormGroup>
                {tags.map((t, i) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox onChange={onChangeInTag} name={t.name} />
                      }
                      label={t.name}
                    />
                  );
                })}
              </FormGroup>
            </Stack> */}
          </Stack>
        </Scrollbar>
      </Drawer>
    </Stack>
  );
}

export default SecondFilter;
