import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { SwitchToggle } from "../../components/SwitchToggle/";
import Container from "../../components/Container/Container";
import SpaceBtw from "../../components/FlexBox/SpaceBtw";
import Tabs from "../../components/Tabs";
import homeTabs from "../../utils/pluginTabs"
import ResponseTimesTab from "../Tabs/ResponseTimesTab";
import VerticalContainer from '../../components/Container/VerticalContainer';
import EndpointsHits from '../Tabs/EndpointHitsTab';

class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <SpaceBtw>
          <h1>
            <FormattedMessage id="store-response-times.name" />
          </h1>
          <SwitchToggle initialValue={true} />
        </SpaceBtw>
        <VerticalContainer>
          <Tabs tabsLabel={homeTabs}>
            <ResponseTimesTab>
            </ResponseTimesTab>

            <EndpointsHits>
            </EndpointsHits>
          </Tabs>
        </VerticalContainer>
      </Container>
    )
  }
};

export default memo(HomePage);
