import { View, Text, StyleSheet } from 'react-native';

function List({ data }) {
    return data.map((dataPoint) => (
        <View style={styles.listItem} key={dataPoint}>
            <Text style={styles.itemText}>{dataPoint}</Text>
        </View>
    ));
}

export default List;

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        backgroundColor: '#E2DCC8FF'
    },
    itemText: {
        color: '#2E0000FF',
        textAlign: 'center'
    }
});