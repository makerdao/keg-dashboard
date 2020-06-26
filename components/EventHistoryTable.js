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

const EventHistoryTable = () => {
  return (
    <Card sx={{ p: 0, pb: 3, height: 7 }}>
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
          maxHeight: 6,
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
  );
};

export default EventHistoryTable;
