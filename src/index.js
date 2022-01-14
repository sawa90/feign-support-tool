import React, { useState } from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import Select, { components } from "react-select";
import './index.scss';


const roleLabel = [{ name: "不明", roletypeNum: 0 },
                   { name: "イノセント", roletypeNum: 1 },
                   { name: "インポスター", roletypeNum: 2 },
                   { name: "ニュートラル", roletypeNum: 3 },
                   { name: "バカ", roletypeNum: 4 },
]
const roletype = ["role unknown","role crew","role imp","role neutral","role insane","role disable"];
const roletypeColor = ["#ddd", "#8f8", "#f88", "#88f","#ff8","#888"];
const roletypeBgColor = ["#fff", "#dfd", "#fdd", "#ddf","#ffd","#ddd"];
const role = [{ id: -2, name: "Hoge", roletype: [false, false, false, false] },
              { id: 0, name: "ねずみ", roletype: [true, true, true, false] },
              {id:1,name:"インベ",roletype:[true, true, true, false]},
              {id:2,name:"ポリス",roletype:[true, true, true, false]},
              {id:3,name:"トラッパ",roletype:[true, true, true, false]},
              {id:4,name:"ルック",roletype:[true, true, true, false]},
              {id:5,name:"挑発",roletype:[true, true, true, false]},
              {id:6,name:"医者",roletype:[true,true, false, false]},
              {id:7,name:"バカ",roletype:[true,true, false, false]},
              {id:8,name:"ブレイマ",roletype:[true,false, true, false]},
              {id:9,name:"クリーナ",roletype:[true,false, true, false]},
              {id:10,name:"シリアル",roletype:[true,false, false, true]},
              {id:11,name:"ボマー",roletype:[true,false, false, true]},
              {id:12,name:"シーフ",roletype:[true,false, false, true]},
              {id:13,name:"サバイバ",roletype:[true,false, false, true]},
              { id: -1, name: "？", roletype: [true, true, true, true]}];

const actionResult = [  { id: 100, name: "成功", roletype: [true, false, false, false] },
                        { id: 101, name: "失敗", roletype: [true, false, false, false] },
                        { id: 102, name: "バカ結果", roletype: [true, false, false, false] },
                        { id: 103, name: "補導", roletype: [true, false, false, false] },
                        { id: 104, name: "罠", roletype: [true, false, false, false] },
                        { id: 105, name: "在宅", roletype: [true, false, false, false] },
                        { id: 106, name: "死亡", roletype: [true, false, true, true] },
                        { id: 107, name: "蘇生", roletype: [true, false, false, false] },
                        { id: 108, name: "？", roletype: [true, false, false, false] },];

const otheActions = ["追放", "キル", "爆発", "CO", "不明"];
const hr = { id: -3, name: "hr", roletype: [false, false, false, false] };
const ActionsNameList = [   { id: -1, name: ["追放", 0] },
                            { id: -2, name: ["殺害", 0] },
                            { id: -3, name: ["医者", 0] },];

const target_day = {
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
        const res = a > b ? 1 : (a < b ? -1 : 0);
        if (order === 'asc') return res;
        else return -res;
    },
    editable: true,
    formatter: (cell, row) => {
        const roles = cell?.map((item, i) => {
            return <span key={item} className={roletype[item[1]]} style={{ margin: "0.1rem", borderRadius: "0.2rem", }}>{item[0]}</span>;
        })
        return roles;
    },
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
        if (!(column.dataField in row)) row[column.dataField] = [];
        return (
            <RoleSelect {...editorProps} value={value} row={row} options={nameList} dataField={column.dataField} text={column.text} />
        );
    },
};
const action_day = {
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
        const res = a > b ? 1 : (a < b ? -1 : 0);
        if (order === 'asc') return res;
        else return -res;
    },
    editable: true,
    formatter: (cell, row) => {
        let Insane = false
        const roles = cell?.map((item, i) => {
            if (item[0] === "バカ結果") {
                Insane = true;
                return;
            }
            return <span key={item + i} className={roletype[item[1]]} style={{ margin: "0.1rem", borderRadius: "0.2rem", }}>{item[0]}</span>;
        }).filter((e) => e);
        return <div className={(Insane ? "InsaneResult " : "Result ")}> {roles?.length ? roles : "　"}</div>;
    },
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
        if (!(column.dataField in row)) row[column.dataField] = [];
        let newOptions = actionResult.slice();
        if (row.id < 0) newOptions = [...nameList, hr, ...newOptions];
        else if (("role" in row && row.role.length) || ("deadRole" in row && row.deadRole.length)) {
            let allrole = [];
            if ("role" in row) allrole = allrole.concat(row.role?.map((item, i) => { return item[0]; }));
            if ("deadRole" in row) allrole = allrole.concat(row.deadRole?.map((item, i) => { return item[0]; }));
            if (allrole.indexOf("ねずみ") >= 0 || allrole.indexOf("インベ") >= 0 || allrole.indexOf("？") >= 0) newOptions = [...newOptions, hr, ...role];
            if (allrole.indexOf("ルック") >= 0 || allrole.indexOf("トラッパ") >= 0 || allrole.indexOf("？") >= 0) newOptions = [...newOptions, hr, ...nameList];
        } else newOptions = [...newOptions, hr, ...role, hr, ...nameList];
        return (
            <RoleSelect {...editorProps} value={value} row={row} options={newOptions} dataField={column.dataField} text={column.text} />
        );
    },
};

const defaultColumns = [
    {
        text: '名前',
        dataField: 'name',
        sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => {
            if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
            const res = a > b ? 1 : (a < b ? -1 : 0);
            if (order === 'asc') return res;
            else return -res;
        },
        editable: true,
        formatter: (cell, row) => {
            if (cell) return cell[0];
            return " ";
        },
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
            return (
                <InsaneSelect {...editorProps} value={value} row={row} options={roleLabel} dataField={column.dataField} text={column.text} />
            );
        },
    },
    {
        text: '役',
        dataField: 'role',
        sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => {
            if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
            const res = a > b ? 1 : (a < b ? -1 : 0);
            if (order === 'asc') return res;
            else return -res;
        },
        editable: true,
        formatter: (cell, row) => {
            const roles = cell?.map((item, i) => {
                return <span key={item} className={roletype[item[1]]} style={{ margin: "0.1rem", borderRadius: "0.2rem", }}>{item[0]}</span>; })
            return roles;
        },
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
            if (!(column.dataField in row))  row[column.dataField] = [];
            return (
                <RoleSelect {...editorProps} value={value} row={row} options={role} dataField={column.dataField} text={column.text} />
            );
        },
    },
    {
        text: '死',
        dataField: 'deadRole',
        sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => {
            if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
            const res = a > b ? 1 : (a < b ? -1 : 0);
            if (order === 'asc') return res;
            else return -res;
        },
        editable: true,
        formatter: (cell, row) => {
            const roles = cell?.map((item, i) => {
                return <span key={item} className={roletype[item[1]]} style={{ margin: "0.1rem", borderRadius: "0.2rem",}}>{item[0]}</span>;
            })
            return roles;
        },
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
            if (!(column.dataField in row)) row[column.dataField] = [];
            return (
                <RoleSelect {...editorProps} value={value} row={row} options={role} dataField={column.dataField} text={column.text} />
            );
        },
    },
    { ...target_day, text: '1', dataField: 'target_day1', },
    { ...action_day, text: '結果', dataField: 'action_day1', },
];

class InsaneSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.row[props.dataField] ?? ["",0]
        };
    }

    getValue() {
        return this.state.value;
    }

    handleOnUpdate(event) {
        if (event) {
            this.setState({
                value: [this.state.value[0], event.value],
            })
            return [this.state.value[0], event.value];
        }
        else return this.state.value;
    }

    render() {
        const { value, onUpdate, ...rest } = this.props;
        const customStyles = {
            option: (provided, { data }) => (
                {
                    ...provided

                }),
            menu: (provided) => ({
                ...provided,
                width: "-moz-fit-content",
                width: "fit-content",
            }),
            menuList: (provided) => ({
                ...provided,
                width: "8rem"
            }),
        };

        return (
            <Select
                {...rest} isClearable={false}
                key={this.props.dataField} name={this.props.text}
                onChange={(event) => onUpdate(this.handleOnUpdate(event))}
                className="selectInsane"
                defaultValue={() => { let role = this.props.row[this.props.dataField]; return { value: role, label: role[0] + "/" +this.props.options[role[1]].name }; }}
                options={[...this.props.options.map((option) => { return { value: option.roletypeNum, label: option.name } })]}
                menuIsOpen={true}
                autoFocus={true}
                styles={customStyles}
            />
        )
    }
}

class RoleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.row[props.dataField] ?? [],
            roleTypeNum: 0,
        };
    }

    getValue() {
        return this.state.value;
    }

    handleOnUpdate(event) {
        if (event) {
            this.setState({
                value: event.map(x => x.value)
            })
            return event.map(x => x.value);
        } else {
            return this.state.value;
        }
    }

    render() {
        const { value, onUpdate, ...rest } = this.props
        const customStyles = {
            option: (provided, { data }) => (
                {
                    ...provided,
                    display: "inline-block",
                    width: "6rem",
                    padding: "0.1rem",
                    borderCollapse: "collapse",
                    border: "0.05rem solid #aaa",
                    backgroundColor: roletypeColor[data.value[1]],

                }),
            control: (provided) => ({
                ...provided,
                display: "flex"
            }),
            multiValue: (provided, { data }) => {
                return {
                    ...provided,
                    backgroundColor: roletypeColor[data.value[1]],
                };
            },
            menu: (provided) => ({
                ...provided,
                width: "-moz-fit-content",
                width: "fit-content",
            }),
            menuList: (provided) => ({
                ...provided,
                width: "18rem",
                marginLeft: "auto",
                marginRight: "auto",
            }),
            container: (provided) => ({
                ...provided,
                width: "-moz-fit-content",
                width: "fit-content",
            }),
        };
        const toggleRoleTypeNum = (typeNum) => {
            if (typeNum == this.state.roleTypeNum) this.setState({ roleTypeNum: 0 });
            else this.setState({ roleTypeNum: typeNum });
        }
        const typeButton = (props) => {
            if (props.data.label === "Hoge") {
                return (
                    <div style={{ display: "flex" }}>
                        <button className="role crew" onClick={() => toggleRoleTypeNum(1)}>crew</button>
                        <button className="role imp" onClick={() => toggleRoleTypeNum(2)}>imp</button>
                        <button className="role neutral" onClick={() => toggleRoleTypeNum(3)}>neutral</button>
                        <button className="role unknown" onClick={() => toggleRoleTypeNum(0)}>none</button>
                    </div>
                );
            } else if (props.data.label == "hr") {
                return <hr style={{ display: "block" }} />;
            }
            return <components.Option {...props} />;
        }
        return (
            <Select
                {...rest} isMulti isClearable={false}
                key={this.props.dataField} name={this.props.text}
                onChange={(event) => onUpdate(this.handleOnUpdate(event))}
                className="selectRole" 
                defaultValue={this.props.row[this.props.dataField].map((role) => { return { value: role, label: role[0] } })}
                options={[...this.props.options.map((option) => { return { value: [option.name, option.roletype[this.state.roleTypeNum] ? this.state.roleTypeNum : 0], label: option.name } })]}
                components={{ Option: typeButton }}
                styles={customStyles}
                menuIsOpen={true}
                autoFocus={true}
            />
        )
    }
}

let nameList = [];


const Game = () => {
    const [render, setRender] = useState(0);
    const [nameText, setNameText] = useState("");
    const [data, setData] = useState([{
        id: 0,
        name: ["ドロップダウンで", 0],
        role: [["役職", 0], ["並べ替えは", 0]],
        deadRole:[["死後に出る",3],],
        target_day1:[["誰の家に",0]],
        action_day1:[["結果",0]],
    },
        {
            id: 1,
            name: ["確定役メモ", 1],
            role: [["列ヘッダクリック", 2]],
            deadRole: [["役職", 0],],
            target_day1: [["行ったか", 0]],
            action_day1: [["バカ結果は黄色く", 0], ["バカ結果", 0]],
        }
    ]);
    const [columns, setColumns] = useState(defaultColumns);
    const onChangeText = (e) => {
        setNameText(e.target.value);
    }
    const onClickButton = () => {
        if (!nameList.length || window.confirm("現在の内容を消去して、新しい名前リストを設定しますか？")) {
            const newNameList = [...new Set(nameText.split('\n'))].filter(e => e !== "");
            nameList = newNameList.map((name, i) => { return { id: i + 200, name: name, roletype: [true, false, false, false] }; });
            setColumns(defaultColumns);
            setData(newNameList.map((name, i) => { return { id: i, name: [name, 0] }; }).concat(ActionsNameList));
        }
    }
    const AddDay = () => {
        const day = (columns.length - 3) / 2 + 1;
        setColumns(columns.concat([{ ...target_day, text: '' + day, dataField: 'target_day' + day, }, { ...action_day, text: '結果', dataField: 'action_day' + day, }]));
    }

    const rowStyle = (row, rowIndex) => {
        if (row.id <0)
            return { backgroundColor: "#eee" };
        if (row.name)
            return { backgroundColor: roletypeBgColor[row.name[1]] };
    };

    return (
        <div>
            <div style={{ paddingBottom: "20rem", }}>
                <button onClick={AddDay}>翌日</button>
                <Container>
                    <BootstrapTable
                        data={data}
                        columns={columns}
                        keyField="id"
                        bootstrap4={true}
                        cellEdit={cellEditFactory({ mode: "click", blurToSave: true, afterSaveCell: (oldValue, newValue, row, column) => { if (column.dataField === 'name') setRender(render + 1); } })}
                        rowStyle={rowStyle}
                    />
                </Container>
            </div>
            <div>
                <textarea cols="20" rows="12" value={nameText} onChange={onChangeText} placeholder="名前を改行区切りで入力出来るだけ短く" />
                <div><button onClick={onClickButton}>setName</button></div>
            </div>
        </div>

    );

}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
