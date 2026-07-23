import { FlatList, Text, View } from 'react-native';
import { homePageStyles } from '../assets/styles/home.style';
import { statusColors } from '../constants/theme';
import AddItem from '../components/addItem';
import TodaysDate from '../components/todaysDate';
import AddPhoto from '../components/addPhoto';

const testingData = [
  { name: 'Food Name 1', category: 'Fruits and Vegetables', date: '1/05/2026' },
  { name: 'Food Name 2', category: 'Meat and Dairy', date: '1/05/2026' },
  { name: 'Food Name 3', category: 'Others', date: '1/05/2026' },
  { name: 'Food Name 4', category: 'Fruits and Vegetables', date: '1/05/2026' },
];

type Section = {
  title: string;
  status: keyof typeof statusColors;
  icon: 'alert-circle' | 'time' | 'checkmark-circle';
};

const SECTIONS: Section[] = [
  { title: 'Expired Items', status: 'expired', icon: 'alert-circle' },
  { title: 'Near Expiry Items', status: 'near', icon: 'time' },
  { title: 'Safe Items', status: 'safe', icon: 'checkmark-circle' },
];

const Home = () => {
  const styles = homePageStyles();

  return (
    <View style={styles.container}>
      <View style={styles.welcomeMsg}>
        <Text style={styles.welcomeMsgText}>Welcome back, Username!</Text>
      </View>

      <View style={styles.dateContainer}>
        <TodaysDate />
      </View>

      <View style={styles.itemWrapper}>
        {SECTIONS.map((section) => {
          const { fg, bg } = statusColors[section.status];
          return (
            <View key={section.title} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <View style={[styles.statusDot, { backgroundColor: fg }]} />
                <Text style={styles.itemHeaderText}>{section.title}</Text>
              </View>

              {testingData.length === 0 ? (
                <Text style={styles.emptyText}>Nothing here yet.</Text>
              ) : (
                <FlatList
                  data={testingData}
                  renderItem={({ item }) => (
                    <View style={[styles.itemTile, { backgroundColor: bg }]}>
                      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.itemMeta} numberOfLines={1}>{item.category}</Text>
                      <Text style={styles.itemMeta}>{item.date}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.name}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              )}
            </View>
          );
        })}
      </View>

      {/* Buttons */}
      <View style={styles.bottomButtonWrapper}>
        <View style={styles.bottomButton}>
          <AddItem />
        </View>

        <View style={styles.bottomButton}>
          <AddPhoto />
        </View>
      </View>
    </View>
  )
}

export default Home
