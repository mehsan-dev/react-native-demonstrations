import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  getFirestore,
  collection,
  orderBy,
  query,
  onSnapshot,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { app } from "../../config/firebaseConfig";

const db = getFirestore(app);

const ChatRoom = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const collectionRef = collection(db, "messages");

  useEffect(() => {
    // Subscribe to Firestore collection and listen for real-time updates
    const q = query(collectionRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.unshift({ id: doc.id, ...doc.data() });
      });
      setMessages(messages);
    });

    // Unsubscribe from collection when component unmounts
    return unsubscribe;
  }, []);

  const handleSend = async () => {
    // Add new message to Firestore
    try {
      await addDoc(collectionRef, {
        text: inputText,
        timestamp: Timestamp.now(),
      });
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  message: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
});

export default ChatRoom;
