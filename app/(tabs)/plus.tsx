// app/(tabs)/plus.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

const PlusScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Invite Banner Section */}
        <View style={[styles.sectionContainer, styles.topPadding]}>
            <View style={styles.inviteBanner}>
                <View style={styles.placeholderLogo}><Text style={styles.logoText}>LOGO</Text></View>
                <View style={styles.inviteTextContainer}>
                <Text style={styles.inviteTitle}>Invite friends, share the home hunt!</Text>
                <Text style={styles.inviteSubtitle}>Unlock more features every time you invite a friend to Barak.</Text>
                <TouchableOpacity>
                    <Text style={styles.inviteButton}>Invite Now</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>

        {/* Découvrez ces biens Section - Now with 3 styled list items */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Découvrez ces biens</Text>
          <View style={styles.cardContainer}> 
            <View style={styles.listContainer}>
              {/* Item 1 */}
              <View style={styles.listItemPlaceholder}>
                 <View style={styles.listItemImagePlaceholder}></View>
                 <View style={styles.listItemTextContainer}>
                   <Text style={styles.listItemTitlePlaceholder}>Appartement - Trocadéro</Text>
                   <Text style={styles.listItemSubtitlePlaceholder}>€1.2M | 100m² | 4p</Text>
                 </View>
              </View>
              {/* Item 2 */}
              <View style={styles.listItemPlaceholder}>
                 <View style={styles.listItemImagePlaceholder}></View>
                 <View style={styles.listItemTextContainer}>
                   <Text style={styles.listItemTitlePlaceholder}>Maison - Neuilly</Text>
                   <Text style={styles.listItemSubtitlePlaceholder}>€3.5M | 250m² | 7p</Text>
                 </View>
              </View>
              {/* Item 3 */}
              <View style={styles.listItemPlaceholder}>
                 <View style={styles.listItemImagePlaceholder}></View>
                 <View style={styles.listItemTextContainer}>
                   <Text style={styles.listItemTitlePlaceholder}>Studio - Le Marais</Text>
                   <Text style={styles.listItemSubtitlePlaceholder}>€600k | 35m² | 1p</Text>
                 </View>
              </View>
            </View>
          </View>
        </View>

        {/* Explorer Section - Restyled Chips as Boxes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Explorer</Text>
          <View style={styles.cardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.discoveryRow}>
               <TouchableOpacity style={[styles.tallBoxButton, styles.chipBlue]}><Text style={[styles.chipTextBase, styles.chipTextBlue]}>Bons Plans</Text></TouchableOpacity>
               <TouchableOpacity style={[styles.tallBoxButton, styles.chipGreen]}><Text style={[styles.chipTextBase, styles.chipTextGreen]}>Aimés par d'autres</Text></TouchableOpacity>
               <TouchableOpacity style={[styles.tallBoxButton, styles.chipPurple]}><Text style={[styles.chipTextBase, styles.chipTextPurple]}>Similaires</Text></TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        {/* Vos recherches récentes Section - Still tall list items */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Vos recherches récentes</Text>
          <View style={styles.cardContainer}>
            <View style={styles.listContainer}>
               <View style={[styles.listItemPlaceholder, styles.recentSearchItemHeight]}><Text style={styles.placeholderText}>Recent Search 1: Paris 16eme, 3 pieces</Text></View>
               <View style={[styles.listItemPlaceholder, styles.recentSearchItemHeight]}><Text style={styles.placeholderText}>Recent Search 2: Lyon, &gt;100m², jardin</Text></View>
            </View>
          </View>
        </View>

        {/* Vos biens favoris Section - KEEPS Square Layout */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Vos biens favoris</Text>
          <View style={styles.cardContainer}>
            <View style={styles.gridContainer}>
              <View style={styles.gridItemPlaceholder}></View>
              <View style={styles.gridItemPlaceholder}></View>
            </View>
          </View>
        </View>

        {/* Future Section Placeholder */}
        <View style={[styles.sectionContainer, styles.bottomPadding]}>
             <View style={styles.futurePlaceholder}>
                 <Text style={styles.placeholderText}>Future Section: Market Intelligence / More Discovery</Text>
             </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContainer: { paddingBottom: 32, paddingHorizontal: 16 },
  sectionContainer: { marginBottom: 24 },
  topPadding: { paddingTop: 16 },
  bottomPadding: { paddingBottom: 16 },
  sectionTitle: { 
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8, 
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, 
    padding: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inviteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  placeholderLogo: { width: 40, height: 40, borderRadius: 6, backgroundColor: '#6D28D9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  logoText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  inviteTextContainer: { flex: 1 },
  inviteTitle: { fontWeight: 'bold', color: '#1F2937' },
  inviteSubtitle: { fontSize: 14, color: '#4B5563', marginTop: 4 },
  inviteButton: { marginTop: 8, fontSize: 14, color: '#2563EB', fontWeight: '600' },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItemPlaceholder: {
    width: '48%', 
    aspectRatio: 1, 
    backgroundColor: '#F3F4F6', 
    borderRadius: 8,
    marginBottom: 12, 
  },
  discoveryRow: {
     paddingBottom: 0,
  },
  tallBoxButton: {
    paddingVertical: 30, 
    paddingHorizontal: 16, 
    borderRadius: 8, 
    marginRight: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 1,
    minWidth: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  chipTextBase: { fontSize: 14, fontWeight: '500' },
  chipBlue: { backgroundColor: '#DBEAFE' },
  chipTextBlue: { color: '#1E40AF' },
  chipGreen: { backgroundColor: '#D1FAE5' },
  chipTextGreen: { color: '#065F46' },
  chipPurple: { backgroundColor: '#EDE9FE' },
  chipTextPurple: { color: '#5B21B6' },
  listContainer: {},
  listItemPlaceholder: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 6,
    marginBottom: 12, 
    flexDirection: 'row', 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    overflow: 'hidden', 
  },
  listItemImagePlaceholder: {
    width: 64, 
    height: 64,
    backgroundColor: '#F3F4F6', 
    borderRadius: 4,
    marginRight: 12,
  },
  listItemTextContainer: {
    flex: 1, 
    justifyContent: 'center', 
  },
  listItemTitlePlaceholder: {
    fontSize: 15, 
    fontWeight: '600', 
    color: '#1F2937', 
    marginBottom: 4,
  },
  listItemSubtitlePlaceholder: {
    fontSize: 13, 
    color: '#6B7280', 
  },
  recentSearchItemHeight: {
      paddingVertical: 60,
      flexDirection: 'column', 
      padding: 0, 
      alignItems: 'center', 
      justifyContent: 'center',
      borderWidth: 0, 
      backgroundColor: '#F3F4F6', 
      paddingHorizontal: 16, 
  },
  futurePlaceholder: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#9CA3AF',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#6B7280',
  },
});

export default PlusScreen;
