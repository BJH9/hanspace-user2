import React, { useState } from "react";
// @mui
import { Drawer, Button } from "@mui/material";
import Modal from "react-modal";

export default function FilterDrawer(props) {
  //   const onChange = (e) => {
  //     props.setIsLast(false);
  //     props.setFilterStatus((prevState) => {
  //       return { ...prevState, condition: parseInt(e.target.value), page: 0 };
  //     });
  //   };
  const [isOpen, setIsOpen] = useState();
  const openModal = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      {/* <Modal
        isOpen={isOpen}
        onClose={() => {
          openModal();
        }}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            zIndex: "100",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(0, 0, 0, 0.55)",
          },
          content: {
            position: "absolute",
            top: "0%",
            left: "60%",
            right: "0%",
            bottom: "0%",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        hi
      </Modal> */}
      <Drawer style={{ width: "20%" }} open={isOpen}>
        hi
      </Drawer>

      <Button onClick={openModal}>Filter</Button>
    </React.Fragment>
  );
}
