import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Platform } from 'react-native';
import { useApolloClient } from '@apollo/client';

const CachePanel = () => {
  const client = useApolloClient();
  const [cacheContent, setCacheContent] = useState(null);
  console.log("🚀 ~ CachePanel ~ cacheContent:", cacheContent)

  const fetchCache = () => {
    const cacheData = client.cache.extract();
    setCacheContent(JSON.stringify(cacheData, null, 2));
  };

  useEffect(() => {
    fetchCache();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Refrescar Cache" onPress={fetchCache} />
      {cacheContent && (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.cacheText}>{cacheContent}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  scrollView: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  cacheText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12,
    lineHeight: 18,
    color: '#333',
  },
});

export default CachePanel;
