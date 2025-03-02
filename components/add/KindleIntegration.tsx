import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import IntegrationCard from '@/components/add/IntegrationCard';

interface KindleIntegrationProps {
  textColor: string;
  mutedColor: string;
  borderColor: string;
  cardColor: string;
  primaryColor: string;
  backgroundColor: string;
}

const KindleIntegration: React.FC<KindleIntegrationProps> = ({
  textColor,
  mutedColor,
  borderColor,
  cardColor,
  primaryColor,
  backgroundColor,
}) => {
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const webViewRef = useRef<WebView>(null);

  // Function to handle sync button press
  const handleSync = () => {
    setWebViewVisible(true);
  };

  // Function to handle successful login and cookie extraction
  const handleLoginSuccess = (cookies: Record<string, string>) => {
    // Close the WebView
    setWebViewVisible(false);

    // Set syncing state to show loading indicator
    setSyncing(true);

    // Now send all cookies to the backend (in JSON format)
    console.log('Sending to backend:', cookies);

    // Simulate backend response after 2 seconds
    setTimeout(() => {
      setSyncing(false);
      setLastSync('Just now');

      // In a real app, you would handle the actual response from your backend
      console.log('Sync completed successfully');
    }, 2000);
  };

  // JavaScript to inject into the WebView to extract all cookies
  const injectedJavaScript = `
    // Set up an interval to check for cookies and login status
    const checkInterval = setInterval(() => {
      // Check if we're on the notebook page (post-login)
      const isLoggedIn = window.location.href.includes('read.amazon.com/notebook');
      
      if (isLoggedIn) {
        const cookiesArray = document.cookie.split('; ');
        const cookies = {};
        cookiesArray.forEach(cookie => {
          const parts = cookie.split('=');
          const name = parts.shift();
          const value = parts.join('=');
          cookies[name] = value;
        });
        
        // Send all cookies to React Native
        window.ReactNativeWebView.postMessage(JSON.stringify(cookies));
        // Clear the interval to stop checking
        clearInterval(checkInterval);
      }
    }, 1000); // Check every second
    
    true;
  `;

  return (
    <>
      <IntegrationCard
        title="Kindle"
        description="Sync your Kindle highlights automatically"
        icon="book-open"
        lastSync={lastSync || 'Never synced'}
        disabled={false}
        textColor={textColor}
        mutedColor={mutedColor}
        borderColor={borderColor}
        cardColor={cardColor}
        primaryColor={primaryColor}
        customSyncButton={
          syncing ? (
            <View style={[styles.syncButton, { backgroundColor: cardColor }]}>
              <ActivityIndicator size="small" color={primaryColor} style={styles.syncingIndicator} />
              <Text style={[styles.syncButtonText, { color: textColor }]}>Syncing...</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.syncButton, { backgroundColor: cardColor }]}
              onPress={handleSync}
            >
              <Text style={[styles.syncButtonText, { color: textColor }]}>Sync Now</Text>
            </TouchableOpacity>
          )
        }
      />

      {/* Amazon Login WebView Modal */}
      <Modal
        visible={webViewVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setWebViewVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: textColor }]}>Sign in to Amazon</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setWebViewVisible(false)}
            >
              <Icon name="x" size={24} color={textColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.webViewContainer}>
            <WebView
              ref={webViewRef}
              source={{
                uri: 'https://www.amazon.com/ap/signin?openid.return_to=https%3A%2F%2Fread.amazon.com%2Fnotebook&openid.assoc_handle=amzn_kindle_mykindle_us&openid.mode=checkid_setup&language=en_US&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.pape.max_auth_age=31536000'
              }}
              injectedJavaScript={injectedJavaScript}
              onMessage={(event) => {
                try {
                  const cookies = JSON.parse(event.nativeEvent.data);
                  // Proceed if any cookies were found
                  if (Object.keys(cookies).length > 0) {
                    handleLoginSuccess(cookies);
                  }
                } catch (error) {
                  console.error('Error parsing cookies:', error);
                }
              }}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={[styles.loadingContainer, { backgroundColor }]}>
                  <ActivityIndicator size="large" color={primaryColor} />
                </View>
              )}
              style={styles.webView}
            />
          </View>

          <View style={styles.modalFooter}>
            <Text style={[styles.modalFooterText, { color: mutedColor }]}>
              Please sign in to your Amazon account to sync your Kindle highlights
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  syncButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncButtonText: {
    fontSize: 14,
  },
  syncingIndicator: {
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 50,
      },
      android: {
        paddingTop: 30,
      },
      web: {
        paddingTop: 20,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  webViewContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    padding: 16,
    alignItems: 'center',
  },
  modalFooterText: {
    fontSize: 14,
  },
});

export default KindleIntegration;

