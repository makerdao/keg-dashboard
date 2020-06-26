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

const Index = () => {
  const {
    maker,
    web3Connected,
    getMugBalance,
    claimAll,
    claimAmount,
  } = useMaker();
  const { callTx } = useTxTracker();

  const [mugBalance, setMugBalance] = useState(null);
  const [inputState, setInputState] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      const mug = await getMugBalance();
      setMugBalance(mug.toString());
    };
    if (web3Connected) {
      fetchBalances();
    }
  }, [web3Connected, maker, getMugBalance]);

  const handleInputChange = event => {
    const value = event.target.value;
    setInputState(value);
  };

  // TODO make setmax simply update the input, not init tx.
  const handleSubmit = (setmax = false) => {
    console.log('setmax', setmax);
    const txObject = setmax ? claimAll() : claimAmount(inputState);
    callTx(txObject);
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
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Index;
