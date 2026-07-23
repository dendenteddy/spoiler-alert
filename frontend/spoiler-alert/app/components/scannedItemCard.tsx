import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ApiError, createItem, IdentifiedProduct } from "../lib/api";

type Props = {
    visible: boolean;
    product: IdentifiedProduct | null;
    onClose: () => void;
    onSaved: () => void;
};

const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatDateTime = (date: Date) =>
    `${formatDate(date)} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

const ScannedItemCard = ({ visible, product, onClose, onSaved }: Props) => {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [reminderAt, setReminderAt] = useState<Date | null>(null);
    const [showExpiryPicker, setShowExpiryPicker] = useState(false);
    const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);
    const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setItemName(product.product_name || "");
            setQuantity("1");
            setExpiryDate(null);
            setReminderAt(null);
        }
    }, [product]);

    const handleExpiryChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowExpiryPicker(false);
        if (selectedDate) setExpiryDate(selectedDate);
    };

    const handleReminderDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowReminderDatePicker(false);
        if (selectedDate) {
            setReminderAt((prev) => {
                const next = new Date(selectedDate);
                if (prev) {
                    next.setHours(prev.getHours(), prev.getMinutes());
                }
                return next;
            });
        }
    };

    const handleReminderTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowReminderTimePicker(false);
        if (selectedDate) {
            setReminderAt((prev) => {
                const base = prev ? new Date(prev) : new Date();
                base.setHours(selectedDate.getHours(), selectedDate.getMinutes());
                return base;
            });
        }
    };

    const handleSubmit = async () => {
        if (!itemName.trim()) {
            Alert.alert("Missing item name", "Please enter a name for this item.");
            return;
        }

        const quantityNumber = parseInt(quantity, 10);
        if (!quantityNumber || quantityNumber <= 0) {
            Alert.alert("Invalid quantity", "Please enter a quantity of at least 1.");
            return;
        }

        setSubmitting(true);
        try {
            await createItem({
                item_name: itemName.trim(),
                quantity: quantityNumber,
                expiry_date: expiryDate ? formatDate(expiryDate) : null,
                reminder_at: reminderAt ? reminderAt.toISOString() : null,
                category: product?.categories?.split(",")[0]?.trim() || "Uncategorized",
            });
            onSaved();
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) {
                Alert.alert(
                    "Sign in required",
                    "Saving items needs you to be logged in, and login isn't wired up in the app yet. This card will work once auth lands."
                );
            } else {
                Alert.alert("Couldn't save item", err instanceof Error ? err.message : "Unknown error");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (!product) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <View style={styles.imageWrapper}>
                        {product.image_url ? (
                            <Image source={{ uri: product.image_url }} style={styles.image} resizeMode="contain" />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Ionicons name="fast-food-outline" size={40} color="#999" />
                            </View>
                        )}
                    </View>

                    <Text style={styles.label}>Item name</Text>
                    <TextInput style={styles.input} value={itemName} onChangeText={setItemName} placeholder="Item name" />

                    <Text style={styles.label}>Quantity</Text>
                    <TextInput
                        style={styles.input}
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="number-pad"
                        placeholder="1"
                    />

                    <Text style={styles.label}>Expiry date</Text>
                    <TouchableOpacity style={[styles.input, styles.pickerRow]} onPress={() => setShowExpiryPicker(true)}>
                        <Text>{expiryDate ? formatDate(expiryDate) : "Select date"}</Text>
                        <Ionicons name="calendar-outline" size={18} />
                    </TouchableOpacity>
                    {showExpiryPicker && (
                        <DateTimePicker mode="date" value={expiryDate || new Date()} onChange={handleExpiryChange} />
                    )}

                    <Text style={styles.label}>Notify me</Text>
                    <View style={styles.reminderRow}>
                        <TouchableOpacity
                            style={[styles.input, styles.pickerRow, styles.reminderField]}
                            onPress={() => setShowReminderDatePicker(true)}
                        >
                            <Text>{reminderAt ? formatDate(reminderAt) : "Date"}</Text>
                            <Ionicons name="calendar-outline" size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.input, styles.pickerRow, styles.reminderField]}
                            onPress={() => setShowReminderTimePicker(true)}
                        >
                            <Text>{reminderAt ? formatDateTime(reminderAt).split(" ")[1] : "Time"}</Text>
                            <Ionicons name="time-outline" size={18} />
                        </TouchableOpacity>
                    </View>
                    {showReminderDatePicker && (
                        <DateTimePicker mode="date" value={reminderAt || new Date()} onChange={handleReminderDateChange} />
                    )}
                    {showReminderTimePicker && (
                        <DateTimePicker mode="time" value={reminderAt || new Date()} onChange={handleReminderTimeChange} />
                    )}

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose} disabled={submitting}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit} disabled={submitting}>
                            {submitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.submitButtonText}>Submit</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    card: {
        width: "88%",
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
    },
    imageWrapper: {
        alignItems: "center",
        marginBottom: 12,
    },
    image: {
        width: 120,
        height: 120,
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
        marginTop: 10,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 44,
        justifyContent: "center",
    },
    pickerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    reminderRow: {
        flexDirection: "row",
        gap: 10,
    },
    reminderField: {
        flex: 1,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 12,
    },
    button: {
        flex: 1,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#eee",
    },
    cancelButtonText: {
        fontWeight: "600",
        color: "#333",
    },
    submitButton: {
        backgroundColor: "red",
    },
    submitButtonText: {
        fontWeight: "bold",
        color: "white",
    },
});

export default ScannedItemCard;
