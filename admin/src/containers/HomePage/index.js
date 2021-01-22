import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { SwitchToggle } from "../../components/SwitchToggle";
import Container from "../../components/Container";
import { Graph } from "../../components/Graph/Graph";
import SpaceBtw from "../../components/FlexBox/SpaceBtw";

const HomePage = () => {
  return (
    <Container>
      <SpaceBtw>
        <h1>Response times</h1>
        <SwitchToggle initialValue={true} />
      </SpaceBtw>
      <div>
        <Graph />
      </div>
    </Container>
  );
};

export default memo(HomePage);
