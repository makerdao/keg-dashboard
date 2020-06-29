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

const PASS = 'DrinkingBuddy';
const YANK = 'ByeFelicia';
const CHUG = 'DownTheHatch';

const evMap = {
  [PASS]: 'Added Delegate',
  [YANK]: 'Removed Delegate',
  [CHUG]: 'Withdraw All',
};

const formatData = (event, returnValues) => {
  if ([YANK, PASS].includes(event)) return returnValues.delegate;
  if ([CHUG].includes(event)) return returnValues.beer;
};

// export function formatDate(d) {
//   return (
//     d.toLocaleDateString('en', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     }) +
//     ', ' +
//     d.toLocaleTimeString('en')
//   );
// }

const EventHistoryTable = ({ events }) => {
  console.log('^^^events for table:', events);
  return (
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
        columns={3}
        sx={{
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: 'muted',
          px: 2,
          py: 1,
        }}
      >
        {['Event', 'Time', 'Data'].map((h, key) => (
          <Text sx={{ width: 'auto', fontWeight: 'bold' }} key={key}>
            {h}
          </Text>
        ))}
      </Grid>
      <Box
        sx={{
          maxHeight: 8,
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
        {events
          .sort((a, b) => b.blockNumber - a.blockNumber)
          .map(
            ({ id, event, data, timestamp, returnValues }) =>
              console.log('timestamp table', event) || (
                <Grid columns={3} key={id}>
                  <Text key={id}>{evMap[event]}</Text>
                  <Text key={data}>
                    {timestamp && new Date(timestamp * 1000).toLocaleString()}
                  </Text>
                  <Text key={data}>{formatData(event, returnValues)}</Text>
                </Grid>
              )
          )}
      </Box>
    </Card>
  );
};

export default EventHistoryTable;
