import { Ionicons } from '@expo/vector-icons'
import { ScrollView, Text, View } from 'react-native'
import { settingsPageStyles } from '../assets/styles/settings.style'
import { Button, ScreenHeader } from '../components/ui'
import { colors } from '../constants/theme'

const Settings = () => {
  const styles = settingsPageStyles();
  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" icon="person-outline" />

      <ScrollView contentContainerStyle={[styles.scrollContent, styles.itemWrapper]} showsVerticalScrollIndicator={false}>
        <View style={styles.itemContainer}>
          <View style={styles.profileRow}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={32} color={colors.primary} />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Username</Text>
              <Text style={styles.profileEmail}>address@email.com</Text>
              <Button
                title="Log Out"
                variant="destructive"
                size="md"
                style={{ alignSelf: 'flex-start' }}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionHeader}>THIS MONTH</Text>

          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total items trashed</Text>
            <Text style={styles.trashedValue}>8</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total items saved</Text>
            <Text style={styles.savedValue}>13</Text>
          </View>
        </View>

        {/* Menu Navigation Buttons */}
        <View style={styles.menuButtonStack}>
          <Button title="Account Settings" variant="secondary" onPress={() => {}} />
          <Button title="How to Use the App" variant="secondary" onPress={() => {}} />
          <Button title="Support & FAQ" variant="secondary" onPress={() => {}} />
          <Button title="Donate to Support" variant="secondary" style={styles.donateButton} onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Settings
