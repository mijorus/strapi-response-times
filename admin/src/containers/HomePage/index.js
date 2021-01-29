import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { SwitchToggle } from "../../components/SwitchToggle/";
import Container from "../../components/Container/Container";
import VerticalContainer from "../../components/Container/VerticalContainer";
import { Graph } from "../Graph";
import SpaceBtw from "../../components/FlexBox/SpaceBtw";
import { Select } from '@buffetjs/core';
import { getEndPoints } from "../../utils/requests";

class HomePage extends React.Component {
  componentDidMount() {
    // getEndPoints()
    //   .then(res => console.log(res))
  }

  render() {
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
    )
  }
};

export default memo(HomePage);
