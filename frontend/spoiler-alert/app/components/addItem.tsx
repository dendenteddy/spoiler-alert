import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { componentStyles } from "../assets/styles/add.item.style";
import { Button } from "./ui";
import { colors } from "../constants/theme";

const AddItem = () => {
    const styles = componentStyles();

    const [isModalVisible, setVisible] = useState(false);
    const [newItem, setNewItem] = useState({
        itemName: "",
        category: "Fruits and Vegetables",
        date: ""
    });

    const [newDate, setDate] = useState(new Date());
    const [dateText, setDateText] = useState("Select Date")
    const [showPicker, setPicker] = useState(false);

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setPicker(false);

        if (selectedDate) {
                setDate(selectedDate);
                let fDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
                setDateText(fDate);
        }
    }

    const foodCategories = ["Fruits and Vegetables", "Meat and Dairy", "Carbohydrates", "Others"];


    const handleSubmit = () => {
        // if (newItem.itemName.trim() === "") return;
        // Missing adding item to the item list
        handleCancel();
    }

    const handleCancel = () => {
        setNewItem({
            itemName: "",
            category: "Fruits and Vegetables",
            date: ""
        });
        setDate(new Date())
        setDateText("Select Date")
        setVisible(false);
    }

    return (
        <View>
            <Button title="+ Add Item" onPress={() => setVisible(true)} />

            <Modal
                id="modal add item"
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.instructionText}>Enter the item name:</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder="E.g. Bread"
                                placeholderTextColor={colors.textTertiary}
                                value={newItem.itemName}
                                onChangeText={(e) => setNewItem({...newItem, itemName: e})}
                            />

                        </View>


                        <Text style={styles.instructionText}>Choose the food category:</Text>
                        <View style={styles.textInput}>
                            <Picker
                                selectedValue={newItem.category}
                                onValueChange={(e) => setNewItem({...newItem, category: e})}
                            >
                                {foodCategories.map((c) => (
                                    <Picker.Item key={c} label={c} value={c}/>
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.instructionText}>Select the Date</Text>
                        <View style={[styles.textInput, styles.datePicker]}>
                            <Text>{dateText}</Text>
                            <TouchableOpacity onPress={() => setPicker(true)}>
                                <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
                            </TouchableOpacity>

                            {
                                showPicker && (
                                    <DateTimePicker
                                        mode={'date'}
                                        display={"calendar"}
                                        value={newDate || new Date()}
                                        onChange={handleDateChange}
                                    />
                                )
                            }
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" variant="secondary" style={styles.button} onPress={handleCancel} />
                            <Button title="Submit" variant="primary" style={styles.button} onPress={handleSubmit} />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default AddItem
