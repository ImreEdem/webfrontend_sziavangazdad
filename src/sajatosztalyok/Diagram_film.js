import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Plot from 'react-plotly.js'
const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCim, setDataCim] = useState([]);
  const [dataDarabszam, setDataDarabszam] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim +'diagram');
      const json = await response.json();
      setData(json);
      for (let elem of json){
        dataCim.push(elem.film_cim)
        dataDarabszam.push(elem.Szavazatok_szama) 
      }



    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
        
        <Plot
        data={[
          {type: 'bar', 
          x: dataCim, 
          y: dataDarabszam},
        ]}
        layout={ {width: 1000, height: 880, title: 'Filémekre való szavazatok diagramja'} }
      />
        
        

        {/*
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.film_cim}, {item.Szavazatok_szama}
            </Text>
          )}
        />
      )}
          */}
    </View>
  );
};

export default App;