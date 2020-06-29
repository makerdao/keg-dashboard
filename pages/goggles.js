/** @jsx jsx */
import { useState } from 'react';
import {
  Container,
  jsx,
  Card,
  Heading,
  Text,
  Grid,
  Box,
  Flex,
  Input,
  Button,
} from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import useMaker from '../hooks/useMaker';
import useTxTracker from '../hooks/useTxTracker';
import { useEffect } from 'react';
import { fromWei } from '@makerdao/dai-plugin-mcd/dist/utils';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const PASS = 'DrinkingBuddy';
const YANK = 'ByeFelicia';
const CHUG = 'DownTheHatch';
const SIP = 'JustASip';
const BREW = 'BrewBeer';
const POUR = 'PourBeer';

const evMap = {
  [PASS]: 'Added Delegate',
  [YANK]: 'Removed Delegate',
  [CHUG]: 'Withdraw All (Chug)',
  [SIP]: 'Withdraw (Sip)',
  [BREW]: 'Brewed',
  [POUR]: 'Pour',
};

const parseEvent = event => {
  if (event.event === PASS)
    return (
      <Text>
        {event.returnValues.owner} ADDED ${event.returnValues.delegate} as a
        delegate
      </Text>
    );
  if (event.event === YANK)
    return (
      <Text>
        {event.returnValues.owner} REMOVED ${event.returnValues.delegate} as a
        delegate
      </Text>
    );
  if (event.event === POUR) {
    const num = fromWei(event.returnValues.beer).gt(0.0001)
      ? fromWei(event.returnValues.beer).toString()
      : '< 0.0001';
    return (
      <Text>
        {event.returnValues.bartender} was poured {num} Dai (Chug)
      </Text>
    );
  }
  if (event.event === SIP) {
    const num = fromWei(event.returnValues.beer).gt(0.0001)
      ? fromWei(event.returnValues.beer).toString()
      : '< 0.0001';
    return (
      <Text>
        {event.returnValues.bartender} was poured {num} Dai (Sip)
      </Text>
    );
  }
  if ([CHUG, SIP, BREW, POUR].includes(event.event)) {
    console.log('eventxxx', event);
    const num = fromWei(event.returnValues.beer).gt(0.0001)
      ? `${fromWei(event.returnValues.beer).toString()} Dai`
      : '< 0.0001 Dai';

    return num;
  }
};

const Item = ({ content }) => {
  return <Card>{parseEvent(content)}</Card>;
};

const Goggles = () => {
  const {
    maker,
    web3Connected,
    getMugBalance,
    claimAll,
    claimAmount,
    getUserDelegate,
    delegateTo,
    removeDelegate,
  } = useMaker();
  const { callTx, txState } = useTxTracker();

  const [inputState, setInputState] = useState(null);
  const [delegateInputState, setDelegateInputState] = useState(null);
  const [mugBalance, setMugBalance] = useState(null);
  const [delegate, setDelegate] = useState(ZERO_ADDRESS);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const kegEvents = await maker.service('keg').getAllEventHistory();
      setEvents(kegEvents);
    };
    if (web3Connected) {
      getEvents();
    }
  }, [web3Connected, maker, getMugBalance, getUserDelegate, delegate]);

  return (
    <Container>
      <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
        <Heading>KegDai Payments</Heading>
        {web3Connected &&
          events.map(event => <Item key={event.id} content={event}></Item>)}
      </Box>
    </Container>
  );
};

export default Goggles;
