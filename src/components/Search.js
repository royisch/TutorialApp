import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import { SCREEN_WIDTH } from '../constants/Constants';

let SearchPage = class extends Component {

    state = {
        symbol: '',
        isLoading: false,
        textEmpty: false,
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.searchInput, {width: SCREEN_WIDTH * 0.8}]}
                            ref={(inputRef) => { this.inputRef = inputRef; }}
                            autoCorrect
                            spellCheck
                            value={this.state.value}
                            onChangeText={(value) => {
                                this.setState({value});
                            }}
                            autoCapitalize="none"
                            autoFocus={false}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={styles.buttonStyle}>Search</Text>
                </TouchableOpacity>
            </View >
        );
    }
}
    
const styles = StyleSheet.create({

    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    inputContainer: {
        height: 50,
        alignItems: 'flex-end',
        flexDirection: 'row',
        zIndex: 100,
    },
    buttonContainer: {
        backgroundColor: '#3399cc',
        width: 100,
        borderRadius: 5,
        padding: 15,
        marginTop: 20
    },
    buttonStyle: {
        color: '#fff',
        alignSelf: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        fontSize: 18,
        borderBottomColor: '#48BBEC',
        borderBottomWidth: 1,
        color: '#48BBEC'
    }
});

const mapStateToProps = (state) => {
    return {
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
