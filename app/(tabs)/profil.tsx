// app/(tabs)/profil.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For chevron icons

// Simple row component for settings items
const SettingsRow = ({ label, value, onPress, showChevron = true, children }: { label: string, value?: string, onPress?: () => void, showChevron?: boolean, children?: React.ReactNode }) => (
  <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowValueContainer}>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      {children /* For rendering things like Switches */}
      {onPress && showChevron && <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
    </View>
  </TouchableOpacity>
);

// Simple section component
const SettingsSection = ({ header, children }: { header?: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    {header && <Text style={styles.sectionHeader}>{header.toUpperCase()}</Text>}
    <View style={styles.sectionBody}>
      {children}
    </View>
  </View>
);

const ProfilScreen = () => {
  // Placeholder state for example toggle
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.screenTitle}>Réglages</Text>

        {/* User Info Section (Placeholder) */}
        <TouchableOpacity style={styles.userInfoSection}>
           <View style={styles.avatarPlaceholder} />
           <View>
              <Text style={styles.userName}>User Name</Text>
              <Text style={styles.userPhone}>+33 6 12 34 56 78</Text>
           </View>
           <Ionicons name="chevron-forward" size={20} color="#C7C7CC" style={{ marginLeft: 'auto' }}/>
        </TouchableOpacity>

        {/* Mon Compte Section */}
        <SettingsSection header="Mon Compte">
          <SettingsRow label="Nom d'utilisateur" value="User Name" onPress={() => { /* Navigate to edit */ }} />
          <SettingsRow label="Numéro de téléphone" value="+33 6 12 34 56 78" showChevron={false}/>
          {/* Add Email later if needed */}
          {/* Add Notifications Toggle Example */}
           <SettingsRow label="Notifications Push" showChevron={false}>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    // Add trackColor, thumbColor etc. for styling if needed
                />
           </SettingsRow>
        </SettingsSection>

        {/* Mes Cercles Section */}
        <SettingsSection header="Mes Cercles">
          <SettingsRow label="Inviter mon/ma partenaire" onPress={() => { /* Invite flow */ }} />
          <SettingsRow label="Inviter mes proches" onPress={() => { /* Invite flow */ }} />
          <SettingsRow label="Gérer mes cercles" onPress={() => { /* Navigate to circle management */ }} />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection header="Support">
           <SettingsRow label="Centre d'aide / FAQ" onPress={() => { /* Open Help URL */ }} />
           <SettingsRow label="Nous contacter" onPress={() => { /* Open Contact */ }} />
        </SettingsSection>

        {/* Légal Section */}
        <SettingsSection header="Légal">
           <SettingsRow label="Conditions Générales d'Utilisation" onPress={() => { /* Open URL */ }} />
           <SettingsRow label="Politique de Confidentialité" onPress={() => { /* Open URL */ }} />
        </SettingsSection>

        {/* Actions Section */}
        <SettingsSection>
            <TouchableOpacity style={[styles.row, styles.actionRow]} onPress={() => { /* Logout action */ }}>
                <Text style={[styles.rowLabel, styles.actionText]}>Déconnexion</Text>
            </TouchableOpacity>
        </SettingsSection>

        <SettingsSection>
            <TouchableOpacity style={[styles.row, styles.actionRow]} onPress={() => { /* Delete account action */ }}>
                <Text style={[styles.rowLabel, styles.destructiveText]}>Supprimer mon compte</Text>
            </TouchableOpacity>
        </SettingsSection>

         {/* App Version */}
         <Text style={styles.appVersion}>Version 1.0.0 (Build 1)</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

// Styles aiming for native iOS settings look
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' }, // iOS settings background grey
  scrollContainer: { paddingBottom: 32 },
  screenTitle: { fontSize: 34, fontWeight: 'bold', marginHorizontal: 16, marginTop: 10, marginBottom: 20 },
  userInfoSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 30, // Space below user info
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#C6C6C8',
  },
  avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E5E5EA', marginRight: 16 },
  userName: { fontSize: 17, fontWeight: '600', marginBottom: 2 },
  userPhone: { fontSize: 15, color: '#8E8E93' },
  section: { marginBottom: 30 }, // Space between sections
  sectionHeader: {
      marginLeft: 16,
      marginBottom: 8,
      fontSize: 13,
      color: '#6D6D72', // iOS section header color
      textTransform: 'uppercase',
  },
  sectionBody: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#C6C6C8', // iOS separator color
      overflow: 'hidden', // Helps with inner borders
  },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingLeft: 16, // Standard iOS inset
      paddingRight: 12, // Space for chevron
      backgroundColor: '#FFFFFF',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#C6C6C8',
      minHeight: 44, // Standard iOS row height
  },
  rowLabel: { fontSize: 17, color: '#000000' },
  rowValueContainer: { flexDirection: 'row', alignItems: 'center' },
  rowValue: { fontSize: 17, color: '#8E8E93', marginRight: 8 }, // iOS detail text color
  actionRow: { justifyContent: 'center' }, // Center action text
  actionText: { color: '#007AFF', fontSize: 17 }, // iOS blue action color
  destructiveText: { color: '#FF3B30', fontSize: 17 }, // iOS red destructive color
  appVersion: { textAlign: 'center', color: '#6D6D72', fontSize: 13, marginTop: 20, marginBottom: 20 },
});

export default ProfilScreen;
