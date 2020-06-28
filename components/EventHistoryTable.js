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

const EventHistoryTable = ({ events }) => {
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
        columns={['auto auto']}
        sx={{
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: 'muted',
          px: 2,
          py: 1,
        }}
      >
        {['Id', 'Data'].map((h, key) => (
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
        {events.map(({ id, data }) => (
          <Grid columns={['auto auto']} key={id}>
            <Text key={id}>{id}</Text>
            <Text key={data}>{data}</Text>
          </Grid>
        ))}
      </Box>
    </Card>
  );
};

export default EventHistoryTable;
