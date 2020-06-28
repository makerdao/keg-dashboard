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
import useMaker from '../hooks/useMaker';
import useTxTracker from '../hooks/useTxTracker';
import { useEffect } from 'react';
import EventHistoryTable from '../components/EventHistoryTable';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const Index = () => {
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
  const { callTx } = useTxTracker();

  const [inputState, setInputState] = useState(null);
  const [delegateInputState, setDelegateInputState] = useState(null);
  const [mugBalance, setMugBalance] = useState(null);
  const [delegate, setDelegate] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      const mug = await getMugBalance();
      setMugBalance(mug.toString());
    };
    const fetchDelegate = async () => {
      const pal = await getUserDelegate();
      setDelegate(pal);
    };
    if (web3Connected) {
      fetchBalances();
      fetchDelegate();
    }
  }, [web3Connected, maker, getMugBalance, getUserDelegate]);

  const handleInputChange = event => {
    const value = event.target.value;
    setInputState(value);
  };

  const handleInputChangeDelegate = event => {
    const value = event.target.value;
    setDelegateInputState(value);
  };

  // TODO make setmax simply update the input, not init tx.
  const handleSubmit = (setmax = false) => {
    const txObject = setmax ? claimAll() : claimAmount(inputState);
    callTx(txObject);
  };

  const handleDelegation = () => {
    return delegate === ZERO_ADDRESS
      ? delegateTo(delegateInputState)
      : removeDelegate();
  };

  // const disabled =
  //   inputState <= 0 ||
  //   isNaN(inputState) ||
  //   mugBalance <= '0' ||
  //   inputState > mugBalance;
  const disabled = false;

  return (
    <Container>
      <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
        <Heading>KegDai Payments</Heading>
        {web3Connected && (
          <Grid columns={[2, '1fr 2fr']} sx={{ my: 3 }}>
            <Card sx={{ maxHeight: 7 }}>
              <Grid columns="1">
                <Heading sx={{ pb: 2 }}>Mug Balance</Heading>
                <Text sx={{ fontFamily: 'monospace' }}>
                  {mugBalance} Dai available
                </Text>
                <Flex sx={{ alignItems: 'center' }}>
                  <Input
                    onChange={handleInputChange}
                    sx={{ width: 7, pr: 0 }}
                    placeholder="Chug, chug, chug"
                    type="number"
                  ></Input>
                  <Button
                    onClick={() => handleSubmit(true)}
                    variant="textual"
                    sx={{ fontSize: 3 }}
                  >
                    Max
                  </Button>
                </Flex>
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={disabled}
                  sx={{ width: 6 }}
                >
                  Chug!
                </Button>
              </Grid>
            </Card>
            <EventHistoryTable />
            <Card sx={{ maxHeight: 7 }}>
              <Grid columns="1">
                <Heading sx={{ pb: 2 }}>For my Pals!</Heading>
                <Text>
                  {delegate === ZERO_ADDRESS
                    ? 'Delegate your balance to another user'
                    : 'Revoke your delegate'}
                </Text>
                <Text sx={{ fontFamily: 'monospace' }}>
                  {delegate === ZERO_ADDRESS
                    ? 'Not currently delegating'
                    : `Delegating to ${delegate}`}
                </Text>
                <Flex sx={{ alignItems: 'center' }}>
                  <Input
                    onChange={handleInputChangeDelegate}
                    sx={{ width: 7, pr: 0 }}
                    placeholder="New bud"
                  ></Input>
                </Flex>
                <Button
                  onClick={handleDelegation}
                  disabled={disabled}
                  sx={{ width: 6 }}
                >
                  {delegate === ZERO_ADDRESS ? 'Add' : 'Remove'}
                </Button>
              </Grid>
            </Card>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Index;
