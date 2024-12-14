import { useState } from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  
  const { data, isLoading, error } = useFetch
  ('search', {
    query: 'React developer',
    num_pages: 1
  })

  return (
    <View style={styles.container}> // div containing the popular jobs
      <View style={styles.header}> // div containing the header of the popular jobs
        <Text style={styles.headerTitle}>Popularjobs</Text> // text displaying the title of the popular jobs
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text> // text displaying the button to show all popular jobs
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <PopularJobCard
                item={item}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs