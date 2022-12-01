import { StatusBar } from 'expo-status-bar';
import { useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  
  const [isSupportBiometric,setBiometricSupport] = useState(false)
  const [isAuthenticated,setIsAuthenticated] = useState(false)


  useEffect(()=>{
    (async ()=>{
      const consistent = await LocalAuthentication.hasHardwareAsync();
      setBiometricSupport(consistent);
    })();
  })

  const Authenticate = ()=>{
    const authentation = LocalAuthentication.authenticateAsync({
      promptMessage:'Authenticate with touch id',
      fallbackLabel:'Enter Password'
    })

    authentation.then(result=>{
      setIsAuthenticated(result.success);
    })
  }

  return (
    
    <View style={styles.container}>
      {
         isAuthenticated?<Text>Welcome to my otp less login application</Text>:Authenticate()
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
