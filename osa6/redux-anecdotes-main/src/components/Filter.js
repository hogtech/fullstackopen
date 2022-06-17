import { makeFilter } from '../reducers/filterReducer'
import { useDispatch } from "react-redux"
import { connect } from 'react-redux'

const Filter = (props) => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const value = event.target.value
        //dispatch(makeFilter(value))
        props.makeFilter(value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    makeFilter
}

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)
export default ConnectedFilter