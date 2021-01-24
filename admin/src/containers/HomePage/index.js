import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { SwitchToggle } from "../../components/SwitchToggle/";
import Container from "../../components/Container";
import { Graph } from "../Graph";
import SpaceBtw from "../../components/FlexBox/SpaceBtw";

const HomePage = () => {
  return (
    <Container>
      <SpaceBtw>
        <h1>
          <FormattedMessage id="store-response-times.name" />
        </h1>
        <SwitchToggle initialValue={true} />
      </SpaceBtw>
      <div>
        <Graph />
      </div>
    </Container>
  );
};

export default memo(HomePage);
