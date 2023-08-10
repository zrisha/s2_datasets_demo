import { Select } from 'antd';
const { Option } = Select;

function SelectField(props){
    const handleChange = (value) => {
        props.setFields(value);
    }

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ maxWidth: '500px', minWidth: '250px'}}
            placeholder="Select a field"
            defaultValue={props.selectedFields}
            onChange={handleChange}
        >
            {props.fields.map(item => (
                // disable options to limit total num of selections
                <Option
                    disabled={
                        props.selectedFields.length > 3
                        ? props.selectedFields.includes(item)
                        ? false
                        : true
                        : false
                    }
                    key={item}
                >
                    {item}
                </Option>
            ))}
        </Select>
    )
}

export default SelectField