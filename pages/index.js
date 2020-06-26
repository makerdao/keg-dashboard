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
          <Grid columns={[1, 2]} sx={{ gridTemplateColumns: '1fr 2fr', my: 3 }}>
            <Card>
              <Grid columns="1">
                <Heading sx={{ pb: 2 }}>Mug Balance</Heading>
                <Text sx={{ fontFamily: 'monospace' }}>
                  {mugBalance} Dai available
                </Text>
                <Flex sx={{ alignItems: 'center' }}>
                  <Input
                    onChange={handleInputChange}
                    sx={{ width: 7 }}
                    placeholder="Chug, chug, chug"
                    type="number"
                  ></Input>
                  <Button
                    onClick={() => handleSubmit(true)}
                    variant="textual"
                    sx={{ fontSize: 3 }}
                  >
                    Set Max
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
            <Card sx={{ p: 0, pb: 3 }}>
              <Flex
                sx={{
                  p: 3,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Heading>Transaction History</Heading>
              </Flex>
              <Grid
                columns={2}
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'muted',
                  px: 2,
                  py: 1,
                }}
              >
                {['Date', 'Amount'].map((h, key) => (
                  <Text sx={{ fontWeight: 'bold' }} key={key}>
                    {h}
                  </Text>
                ))}
              </Grid>
              <Box
                sx={{
                  maxHeight: '80px',
                  overflow: 'auto',
                  borderBottom: '1px solid',
                  borderColor: 'muted',
                  px: 2,
                  py: 1,
                  '&::-webkit-scrollbar': {
                    width: '5px',
                    minWidth: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'foreground',
                    borderRadius: 'small',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'muted',
                    borderRadius: 'small',
                  },
                }}
              >
                {[
                  ['row1', '1'],
                  ['row2', '1'],
                  ['row3', '1'],
                  ['row4', '1'],
                  ['row5', '1'],
                  ['row6', '1'],
                ].map((row, key) => (
                  <Grid columns={2} key={key}>
                    {row.map((cell, key) => (
                      <Text key={key}>{cell}</Text>
                    ))}
                  </Grid>
                ))}
              </Box>
            </Card>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Index;
