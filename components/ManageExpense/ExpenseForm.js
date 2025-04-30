import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/styles';
import Button from '../../UI/Button';
import IconButton from '../../UI/IconButton';
import { getFormattedDate } from '../../utils/date';

function ExpenseForm({ onCancel, onSubmit, onDelete, defaultValues, isEditing }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((prevValues) => ({
            ...prevValues,
            [inputIdentifier]: {
                value: enteredValue,
                isValid: true,
            },
        }));
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((prevValues) => ({
                ...prevValues,
                amount: {
                    value: prevValues.amount.value,
                    isValid: amountIsValid,
                },
                date: {
                    value: prevValues.date.value,
                    isValid: dateIsValid,
                },
                description: {
                    value: prevValues.description.value,
                    isValid: descriptionIsValid,
                },
            }));
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Manage Expense</Text>
            <View style={styles.inputsRow}>
                <Input label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                }} style={styles.rowInput} invalid={!inputs.amount.isValid} />
                <Input label="Date" textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }} style={styles.rowInput} invalid={!inputs.date.isValid} />
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value,
            }} style={styles.rowInput} invalid={!inputs.description.isValid} />
            {formIsInvalid && <Text style={styles.errorText}>All inputs are valid</Text>}
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing && <View style={styles.deleteContainer}>
                <IconButton icon="trash" size={36} color={GlobalStyles.colors.error500} onPress={onDelete} />
            </View>}
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    deleteContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: GlobalStyles.colors.error50,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
});
