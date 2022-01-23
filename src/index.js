import React, { useState } from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import Select, { components } from "react-select";
import CreatableSelect from 'react-select/creatable';
import './index.scss';
{

    const roleLabel = [{ name: "不明", roletypeNum: 0 },
    { name: "緑確", roletypeNum: 1 },
    { name: "赤確", roletypeNum: 2 },
    { name: "青確", roletypeNum: 3 },
    { name: "バカ", roletypeNum: 4 },
    { name: "緑目", roletypeNum: 5 },
    { name: "赤目", roletypeNum: 6 },
    { name: "青目", roletypeNum: 7 },
    { name: "緑赤", roletypeNum: 8 },
    { name: "緑青", roletypeNum: 9 },
    { name: "赤青", roletypeNum: 10 },
    { name: "黒目", roletypeNum: 11 },
    ]
    const roleLabelBgColor = ["#fff", "#dfd", "#fdd", "#ddf", "#ffd"];
    const optionbackground = [
        { backgroundColor: roleLabelBgColor[0] },
        { backgroundColor: roleLabelBgColor[1] },
        { backgroundColor: roleLabelBgColor[2] },
        { backgroundColor: roleLabelBgColor[3] },
        { backgroundColor: roleLabelBgColor[4] },
        { background: "linear-gradient(45deg, #dfd 0%, #dfd 50%, #fff 50%, #fff 100%)" },
        { background: "linear-gradient(45deg, #fdd 0%, #fdd 50%, #fff 50%, #fff 100%)" },
        { background: "linear-gradient(45deg, #ddf 0%, #ddf 50%, #fff 50%, #fff 100%)" },
        { background: "linear-gradient(45deg, #dfd 0%, #dfd 50%, #fdd 50%, #fdd 100%)" },
        { background: "linear-gradient(45deg, #dfd 0%, #dfd 50%, #ddf 50%, #ddf 100%)" },
        { background: "linear-gradient(45deg, #fdd 0%, #fdd 50%, #ddf 50%, #ddf 100%)" },
        { background: "linear-gradient(45deg, #fdd 0%, #fdd 35%, #ddf 35%, #ddf 60%, #fff 60%, #fff 100%) " },
    ]

    const roletype = ["role unknown", "role crew", "role imp", "role neutral", "role insane", "role sane"];
    const roletypeColor = ["#ddd", "#8f8", "#f88", "#88f", "#ff8", "#8ff", "#888"];

    const role = [
        { id: -2, name: "Hoge", roletype: [false, false, false, false, false], actionType: 1 },
        { id: 0, name: "ねずみ", roletype: [true, true, true, false, true], actionType: 1 },
        { id: 1, name: "インベ", roletype: [true, true, true, false, true], actionType: 1 },
        { id: 2, name: "ポリス", roletype: [true, true, true, false, true], actionType: 1 },
        { id: 3, name: "トラッパ", roletype: [true, true, true, false, true], actionType: 1 },
        { id: 4, name: "ルック", roletype: [true, true, true, false, true], actionType: 1 },
        { id: 5, name: "挑発", roletype: [true, true, true, false, true], actionType: 1 },
        { id: 6, name: "医者", roletype: [true, true, false, false, true], actionType: 1 },
        { id: 7, name: "バカ", roletype: [true, true, false, false, true], actionType: 1 },
        { id: 8, name: "ブレイマ", roletype: [true, false, true, false, true], actionType: 1 },
        { id: 9, name: "クリーナ", roletype: [true, false, true, false, true], actionType: 1 },
        { id: 10, name: "シリアル", roletype: [true, false, false, true, false], actionType: 1 },
        { id: 11, name: "ボマー", roletype: [true, false, false, true, false], actionType: 1 },
        { id: 12, name: "シーフ", roletype: [true, false, false, true, false], actionType: 1 },
        { id: 13, name: "サバイバ", roletype: [true, false, false, true, false], actionType: 1 },
        { id: -1, name: "？", roletype: [true, true, true, true, true], actionType: 1 }];

    const roleImage = {
        "ねずみ": process.env.PUBLIC_URL + "/image/Snitch.png",
        "インベ": process.env.PUBLIC_URL + "/image/Investigator.png",
        "ポリス": process.env.PUBLIC_URL + "/image/Police.png",
        "トラッパ": process.env.PUBLIC_URL + "/image/Trapper.png",
        "ルック": process.env.PUBLIC_URL + "/image/Lookout.png",
        "挑発": process.env.PUBLIC_URL + "/image/Provoker.png",
        "医者": process.env.PUBLIC_URL + "/image/Doctor.png",
        "バカ": process.env.PUBLIC_URL + "/image/Insane.png",
        "ブレイマ": process.env.PUBLIC_URL + "/image/Blamer.png",
        "クリーナ": process.env.PUBLIC_URL + "/image/Cleaner.png",
        "シリアル": process.env.PUBLIC_URL + "/image/SerialKiller.png",
        "ボマー": process.env.PUBLIC_URL + "/image/Bomber.png",
        "シーフ": process.env.PUBLIC_URL + "/image/Thief.png",
        "サバイバ": process.env.PUBLIC_URL + "/image/Survivor.png",
        "？": process.env.PUBLIC_URL + "/image/Unknown.png",
        "成功": process.env.PUBLIC_URL + "/image/Success.png",
        "失敗": process.env.PUBLIC_URL + "/image/Failure.png",
    };
    const actionResult = [
        { id: 100, name: "成功", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 101, name: "失敗", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 102, name: "？", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 103, name: "バカ結果？", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 104, name: "真結果", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 105, name: "補導", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 106, name: "罠", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 107, name: "在宅", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 108, name: "死亡", roletype: [true, false, true, true, false], actionType: 0 },
        { id: 109, name: "蘇生", roletype: [true, false, false, false, false], actionType: 0 },
        { id: 110, name: "重要結果", roletype: [true, false, false, false, false], actionType: 0 },];

    const otheActions = ["追放", "キル", "爆発", "CO", "不明"];
    const hr = { id: -3, name: "hr", roletype: [false, false, false, false, false] };
    const ActionsNameList = [
        { id: -1, name: ["追放", 0] },
        { id: -2, name: ["殺害", 0] },
        { id: -3, name: ["爆発", 0] },
        { id: -4, name: ["医者", 0] },
        { id: -5, name: ["挑発", 0] },
        { id: -6, name: ["対立", 0] },
        { id: -7, name: ["ﾗｲﾝ", 0] },];
    const column_template = {
        sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => {
            if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
            const valueIsResultColor = (array) => (
                array && array.length && array[0][2] !== 2 && (array[0][0] === "バカ結果？" || array[0][0] === "真結果" || array[0][0] === "重要結果"));
            const newvalue = (value, row) => {
                let nvalue = value.slice();
                while (valueIsResultColor(nvalue)) nvalue.shift();
                return nvalue;
            }
            const newa = newvalue(a, rowA);
            const newb = newvalue(b, rowB);
            const res = newa > newb ? 1 : (newa < newb ? -1 : 0);
            if (order === 'asc') return res;
            else return -res;
        },
        editable: true,
        formatter: (cell, row) => {
            let insane = false;
            let sane = false;
            let important = false;
            let directionColumn = row.id < 0;
            if (!directionColumn) {
                let nameNum = 0;
                cell?.forEach((item) => { if (item[2] === 2) nameNum++; });
                if (nameNum > 1) directionColumn = true;
            }
            let roles = cell?.map((item, i) => {
                if (item[2] !== 2) {
                    if (item[0] === "バカ結果？") {
                        insane = true;
                        return;
                    } else if (item[0] === "真結果") {
                        sane = true;
                        return;
                    }
                    if (item[0] === "重要結果") {
                        important = true;
                        return;
                    }
                    if (item[0] in roleImage) return <img key={item + i} className={roletype[item[1]]} src={roleImage[item[0]]} alt={item[0]} />;
                } else if (playerIsIcon && item[0] in colorNameDic) {
                    return <span key={item + i} className="iconContainer"><img src={colorNameDic[item[0]][0]} alt={item[0]} /><span className="iconTextContainer "><span className="iconText">{item[0]}</span></span></span>;
                }
                if (directionColumn && item[2] === 2) return <span key={item + i} className="name"><span className={roletype[item[1]]} > {item[0]}</span></span>;
                else return <span key={item + i} className={roletype[item[1]]} > {item[0]}</span>;
            }).filter((e) => e);
            roles = <div>{roles?.length ? roles : "　"}</div>;
            if (insane || sane) roles = <div className={(insane ? "InsaneResult " : "SaneResult")} > {roles}</div>;
            if (important) roles = <div className="Important" >{roles}</div>;
            return roles;
        },
    };

    const target_day = {
        ...column_template,
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
            if (!(column.dataField in row)) row[column.dataField] = [];
            let options = nameList;
            return (
                <RoleSelect {...editorProps} value={value} row={row} options={options} dataField={column.dataField} text={column.text} />
            );
        },
    };
    const action_day = {
        text: '　',
        ...column_template,
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
            if (!(column.dataField in row)) row[column.dataField] = [];
            let newOptions = actionResult.slice();
            if (row.id < 0) newOptions = [...nameList, hr, ...newOptions, hr, ...role];
            else if (("role" in row && row.role.length) || ("deadRole" in row && row.deadRole.length)) {
                let allrole = [];
                if ("role" in row) allrole = allrole.concat(row.role?.map((item, i) => { return item[0]; }));
                if ("deadRole" in row) allrole = allrole.concat(row.deadRole?.map((item, i) => { return item[0]; }));
                if (allrole.indexOf("ねずみ") >= 0 || allrole.indexOf("インベ") >= 0 || allrole.indexOf("シーフ") >= 0 || allrole.indexOf("？") >= 0) newOptions = [...role, hr, ...newOptions];
                if (allrole.indexOf("ルック") >= 0 || allrole.indexOf("シーフ") >= 0) newOptions = [...nameList, hr, ...newOptions,];
                else if (allrole.indexOf("トラッパ") >= 0 || allrole.indexOf("？") >= 0) newOptions = [...newOptions, hr, ...nameList];
            } else newOptions = [...newOptions, hr, ...role, hr, ...nameList];
            return (
                <RoleSelect {...editorProps} value={value} row={row} options={newOptions} dataField={column.dataField} text={column.text} />
            );
        },
    };
    const colorList = [
        [process.env.PUBLIC_URL +"/icon/White.png", "#ffffff"],
        [process.env.PUBLIC_URL +"/icon/Orange.png", "#ff871f"],
        [process.env.PUBLIC_URL +"/icon/Purple.png", "#71348b"],
        [process.env.PUBLIC_URL +"/icon/Green.png", "#2a7b0c"],
        [process.env.PUBLIC_URL +"/icon/Blue.png", "#4b6fd7"],
        [process.env.PUBLIC_URL +"/icon/Red.png", "#b3000b"],
        [process.env.PUBLIC_URL +"/icon/Yellow.png", "#ffe352"],
        [process.env.PUBLIC_URL +"/icon/Lime.png", "#83ff46"],
        [process.env.PUBLIC_URL +"/icon/Cyan.png", "#31d7c7"],
        [process.env.PUBLIC_URL +"/icon/Pink.png", "#ff8fb3"],
        [process.env.PUBLIC_URL +"/icon/Brown.png", "#654321"],
        [process.env.PUBLIC_URL +"/icon/Magenta.png", "#ff00df"],
        [process.env.PUBLIC_URL +"/icon/DarkBlue.png", "#3817e3"],
        [process.env.PUBLIC_URL +"/icon/DarkGreen.png", "#2a5b2b"],
        [process.env.PUBLIC_URL +"/icon/DarkOrange.png", "#ff4406"],
    ];
    const defaultColumns = [
        {
            text: '　',
            dataField: 'color',
            editable: true,
            sort: true,
            sortFunc: (a, b, order, dataField, rowA, rowB) => {
                if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
                const res = a > b ? 1 : (a < b ? -1 : 0);
                if (order === 'asc') return res;
                else return -res;
            },
            formatter: (cell, row) => {
                if (nameIsIcon) {
                    const name = row.name[0];
                    if (row.id >= 0 && name in colorNameDic) {
                        return <div className="nameAreaIconContainer"><span className="iconContainer"><img src={colorNameDic[name][0]} alt={name} /><span className="iconTextContainer "><span className="iconText">{name}</span></span></span></div>;
                    } else return name;
                } else if (cell && cell.length >1) {
                    return <div className="colorpicker" style={{display:"block", backgroundColor: cell[1] }}></div>;
                }
                return " ";
            },
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
                if (!(column.dataField in row)) row[column.dataField] = false;
                return (
                    <ColorSelect {...editorProps} value={value} row={row} options={colorList} dataField={column.dataField} text={column.text} />
                );
            },
        },
        {
            text: '名前',
            dataField: 'name',
            sort: true,
            sortFunc: (a, b, order, dataField, rowA, rowB) => {
                if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
                const na = a[1] + a[0];
                const nb =  b[1] + b[0];
                const res = na > nb ? 1 : (na < nb ? -1 : 0);
                if (order === 'asc') return res;
                else return -res;
            },
            editable: true,
            formatter: (cell, row) => {
                if (cell) {
                    if (cell[1] >= 5) return <span className="might" style={optionbackground[cell[1]]}>{nameIsIcon ?"　": cell[0]}</span>;
                    return nameIsIcon ? "　" : cell[0];
                }
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
            ...column_template,
            sortFunc: (a, b, order, dataField, rowA, rowB) => {
                if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
                const valueIsResultColor = (array) => {
                    return (array && array.length && array[0][2] !== 2 && (array[0][0] === "バカ結果？" || array[0][0] === "真結果" || array[0][0] === "重要結果"));
                };
                const newvalue = (value, row) => {
                    if (value && value.length) {
                        let nvalue = value.slice();
                        while (valueIsResultColor(nvalue)) nvalue.shift();
                        if (nvalue.length) return nvalue[0][0] + "z" + nvalue[0][1];
                    }
                    if (row.deadRole && row.deadRole.length) {
                        let nvalue = row.deadRole.slice();
                        while (valueIsResultColor(nvalue)) nvalue.shift();
                        if (nvalue.length) return nvalue[0][0] + "0" + nvalue[0][1];
                    }
                    return "";
                }
                const newa = newvalue(a, rowA);
                const newb = newvalue(b, rowB);
                const res = newa > newb ? 1 : (newa < newb ? -1 : 0);
                if (order === 'asc') return res;
                else return -res;
            },
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
                if (!(column.dataField in row)) row[column.dataField] = [];
                const roleWithTrue = [...role, { id: 103, name: "バ", roletype: [true, false, false, false, false], actionType: 0 }, { id: 104, name: "真", roletype: [true, false, false, false, false], actionType: 0 }];
                return (
                    <RoleSelect {...editorProps} value={value} row={row} options={roleWithTrue} dataField={column.dataField} text={column.text} />
                );
            },
        },
        {
            text: '死',
            dataField: 'deadRole',
            ...column_template,
            sortFunc: (a, b, order, dataField, rowA, rowB) => {
                if (rowA.id < 0 || rowB.id < 0) return rowB.id - rowA.id;
                const valueIsResultColor = (array) => {
                    return (array && array.length && array[0][2] !== 2 && (array[0][0] === "バカ結果？" || array[0][0] === "真結果" || array[0][0] === "重要結果"));
                };
                const newvalue = (value, row) => {
                    if (value && value.length) {
                        let nvalue = value.slice();
                        while (valueIsResultColor(nvalue)) nvalue.shift();
                        if (nvalue.length) return "0" + nvalue[0][0]  + nvalue[0][1];
                    }
                    if (row.role && row.role.length) {
                        let nvalue = row.role.slice();
                        while (valueIsResultColor(nvalue)) nvalue.shift();
                        if (nvalue.length) return "2" + nvalue[0][0]  + nvalue[0][1];
                    }
                    return "1";
                }
                const newa = newvalue(a, rowA);
                const newb = newvalue(b, rowB);
                const res = newa > newb ? 1 : (newa < newb ? -1 : 0);
                if (order === 'asc') return res;
                else return -res;
            },
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
                if (!(column.dataField in row)) row[column.dataField] = [];
                return (
                    <RoleSelect {...editorProps} value={value} row={row} options={role} dataField={column.dataField} text={column.text} />
                );
            },
        },
        { ...target_day, text: '1', dataField: 'target_day1', },
        { ...action_day, dataField: 'action_day1', },
    ];


    class ColorSelect extends React.Component {
        constructor(props) {
            super(props);
            let name = false;
            if (props.row.id >= 0) name = props.row.name[0];
            this.state = {
                value: this.props.row[props.dataField],
                name: name
            };
        }

        getValue() {
            if ("newValue" in this) return this.newValue;
            else return this.state.value;
        }

        handleOnUpdate(event) {
            if (event) {
                this.setState({
                    value: event.value,
                })
                if (this.state.name) colorNameDic[this.state.name] = event.value;
                return event.value;
            }
            else return this.state.value;
        }

        render() {
            const { value, onUpdate, ...rest } = this.props;
            const optionstyle = {
                display: "inline-block",
                width: "2rem",
                height: "2rem",
                margin: "0.05rem",
                borderRadius: "0.5rem",
                padding: "0",
                borderCollapse: "collapse",
                border: "0.05rem solid #aaa",
            };
            const customStyles = {
                option: (provided, state) => {
                    return ({
                        ...provided,
                        ...optionstyle,
                        backgroundColor:state.data.value[1],
                    });
                },
                control: (provided) => ({
                    ...provided,
                    display: "flex"
                }),
                menu: (provided) => ({
                    ...provided,
                    width: "-moz-fit-content",
                    width: "fit-content",
                }),
                menuList: (provided) => ({
                    ...provided,
                    width: "12.6rem",
                }),
                container: (provided) => ({
                    ...provided,
                    width: "-moz-fit-content",
                    width: "fit-content",
                }),
            };

            return (
                <Select
                    {...rest} isClearable={false}
                    key={this.props.dataField} name={this.props.text}
                    onChange={(event) => { this.newValue = this.handleOnUpdate(event); return onUpdate(this.newValue); }}
                    className="select Color"
                    defaultValue={() => { let color = this.props.row[this.props.dataField]; if (color) return { value: color, label: <div className="colorpicker" style={{ backgroundColor: color[1] }}>　</div> }; }}
                    options={[...this.props.options.map((option) => { return { value: option, label: "　" } })]}
                    menuIsOpen={true}
                    autoFocus={true}
                    styles={customStyles}
                />
            )
        }
    }

    class InsaneSelect extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: this.props.row[props.dataField] ?? ["", 0]
            };
        }

        getValue() {
            if ("newValue" in this) return this.newValue;
            else return this.state.value;
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
            const optionstyle = {
                display: "inline-block",
                width: "4rem",
                padding: "0.1rem",
                borderCollapse: "collapse",
                border: "0.05rem solid #aaa",
            };
            const customStyles = {
                option: (provided, state) => {
                    const roletypeNum = state.data?.value ?? 0;
                    return ({
                        ...provided,
                        ...optionstyle,
                        ...optionbackground[roletypeNum],
                    });
                },
                control: (provided) => ({
                    ...provided,
                    display: "flex"
                }),
                menu: (provided) => ({
                    ...provided,
                    width: "-moz-fit-content",
                    width: "fit-content",
                }),
                menuList: (provided) => ({
                    ...provided,
                    width: "16rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                }),
                container: (provided) => ({
                    ...provided,
                    width: "-moz-fit-content",
                    width: "fit-content",
                }),
            };

            return (
                <Select
                    {...rest} isClearable={false}
                    key={this.props.dataField} name={this.props.text}
                    onChange={(event) => { this.newValue = this.handleOnUpdate(event); return onUpdate(this.newValue); }}
                    className="selectInsane"
                    defaultValue={() => { let role = this.props.row[this.props.dataField]; return { value: role, label: role[0] + "/" + this.props.options[role[1]]?.name }; }}
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
            if ("newValue" in this) return this.newValue;
            else return this.state.value;
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
                option: (provided, state) => {
                    const style = (
                        {
                            ...provided,
                            display: "inline-block",
                            width: (typeof (state.label) === "string") ? "6rem" : "2rem",
                            padding: "0.1rem",
                            borderCollapse: "collapse",
                            border: "0.05rem solid #aaa",
                            backgroundColor: roletypeColor[state.data.value[1]],
                            boxSizing: "border-box",
                        });
                    if (state.data.value[2] === 2 && state.data.value[0] in colorNameDic)
                        style.background = "linear-gradient(transparent 80%, " + colorNameDic[state.data.value[0]][1] + " 18%)";
                    return style;
                },
                control: (provided) => ({
                    ...provided,
                    display: "flex"
                }),
                multiValue: (provided, { data }) => {
                    if (data.value[2] === 2 && data.value[0] in colorNameDic) return {
                        ...provided,
                        background: "linear-gradient(transparent 80%, " + colorNameDic[data.value[0]][1] + " 18%)",
                        border: "1px solid #888",
                    };
                    else return {
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
                if (typeNum === this.state.roleTypeNum) this.setState({ roleTypeNum: 0 });
                else this.setState({ roleTypeNum: typeNum });
            }
            const typeButton = (props) => {
                if (props.data.value?.length) {
                    if (props.data.value[0] === "Hoge") {
                        return (
                            <div style={{ display: "flex" }}>
                                <button className="role crew" onClick={() => toggleRoleTypeNum(1)}>crew</button>
                                <button className="role imp" onClick={() => toggleRoleTypeNum(2)}>imp</button>
                                <button className="role neutral" onClick={() => toggleRoleTypeNum(3)}>neutral</button>
                                <button className="role insane" onClick={() => toggleRoleTypeNum(4)}>バカ</button>
                                <button className="role unknown" onClick={() => toggleRoleTypeNum(0)}>none</button>
                            </div>
                        );
                    } else if (props.data.value[0] === "hr") {
                        return <hr style={{ display: "block" }} />;
                    }
                }
                return <components.Option {...props} />;
            }
            return (
                <CreatableSelect
                    {...rest} isMulti isClearable={false}
                    key={this.props.dataField} name={this.props.text}
                    onChange={(event) => { this.newValue = this.handleOnUpdate(event); return onUpdate(this.newValue); }}
                    className="selectRole"
                    defaultValue={this.props.row[this.props.dataField].map((role) => {
                        let label = role[0];
                        if (role[2] !== 2 && role[0] in roleImage) {
                            label = <img src={roleImage[role[0]]} alt={role[0]} />;
                        }
                        return { value: role, label: label }
                    })}
                    options={[...this.props.options.map((option) => {
                        let label = option.name;
                        let roleTypeNum = option.roletype[this.state.roleTypeNum] ? this.state.roleTypeNum : 0;
                        if (option.actionType !== 2) {
                            if (option.name in roleImage) {
                                label = <span className="selectImg"><img src={roleImage[option.name]} alt={option.name} /></span>;
                            }
                            if (option.actionType === 0) {
                                if (option.name === "バ") return { value: ["バカ結果？", 4, 0], label: <span className="selectImg">バ</span> };
                                if (option.name === "真") return { value: ["真結果", 5, 0], label: <span className="selectImg">真</span> };
                                if (option.name === "バカ結果？") roleTypeNum = 4;
                                else if (option.name === "真結果") roleTypeNum = 5;
                            }
                        } 
                        return {
                            value: [option.name, roleTypeNum, option.actionType], label: label
                        };
                    })]}
                    components={{ Option: typeButton }}
                    styles={customStyles}
                    menuIsOpen={true}
                    autoFocus={true}
                    getNewOptionData={(newOptionString) => ({ value: [newOptionString, 0, 3], label: newOptionString })}
                />
            )
        }
    }

    let nameList = [];
    let colorNameDic = {};
    let playerIsIcon = true;
    let nameIsIcon = false;


    const Game = () => {
        const [render, setRender] = useState(false);
        const [nameText, setNameText] = useState("");
        const [PlayerIsIcon, setPlayerIsIcon] = useState(playerIsIcon);
        const [NameIsIcon, setNameIsIcon] = useState(nameIsIcon);
        const [nameStringList, setNameStringList] = useState([]);
        const [data, setData] = useState([{
            id: 0,
            name: ["下部で名前入力", 0],
            role: [["トラッパ", 0, 1], ["CO欄", 0, 0]],
            deadRole: [["霊能結果", 3, 0],],
            target_day1: [["ターゲット欄", 0, 0]],
            action_day1: [["結果欄", 0, 0], ["成功", 0, 0], ["失敗", 0, 0], ["罠", 0, 0], ["ボマー", 3, 1]],
        },
        {
            id: 1,
            name: ["名前クリックで陣営メモ", 5],
            role: [["ヘッダクリックで並べ替え", 2, 0]],
            deadRole: [["ポリス", 1, 1]],
            target_day1: [],
            action_day1: [["バカ結果？は黄色く", 0, 0], ["バカ結果？", 0, 0]],
        },
        ]);
        const [columns, setColumns] = useState(defaultColumns);
        const onChangeText = (e) => {
            setNameText(e.target.value);
        }
        const onClickButton = () => {
            if (!nameList.length || window.confirm("現在の内容を消去して、新しい名前リストを設定しますか？")) {
                const newNameStringList = [...new Set(nameText.split('\n'))].filter(e => e !== "");
                setNameStringList(newNameStringList);
                nameList = newNameStringList.map((name, i) => { return { id: i + 200, name: name, roletype: [true, true, true, true, true,], actionType: 2 }; }).concat({ id: 199, name: "？", roletype: [true, false, false, false, false], actionType: 2 });
                colorNameDic = {};
                const newColumns = defaultColumns.slice();
                const firstColumn = newColumns.shift();
                if (nameIsIcon) {
                    if (firstColumn.dataField === "name") newColumns.unshift(firstColumn);
                    else newColumns.splice(1, 0, firstColumn);
                } else {
                    if (firstColumn.dataField == "color") newColumns.unshift(firstColumn);
                    else newColumns.splice(1, 0, firstColumn);
                }
                newColumns[0].text = "　";
                newColumns[1].text = "名前";
                setColumns(newColumns);
                setData(newNameStringList.map((name, i) => { return { id: i, name: [name, 0] }; }).concat(ActionsNameList.map((item) => Object.assign({}, item))));
            } else if (window.confirm("名前リストを更新しますか？（名前が削除・変更されたデータは消去されます）")) {
                const newNameStringList = [...new Set(nameText.split('\n'))].filter(e => e !== "");
                nameList = newNameStringList.map((name, i) => { return { id: i + 200, name: name, roletype: [true, true, true, true, true,], actionType: 2 }; }).concat({ id: 199, name: "？", roletype: [true, false, false, false, false], actionType: 2 });
                let maxid = 0;
                let fixedData = null;
                let newData = data.map((item, i) => {
                    if (item.id > maxid) maxid = item.id;
                    if (item.id === -1) fixedData = item;
                    if (newNameStringList.indexOf(item.name[0]) < 0 && item.id >= 0) return;
                    else return item;
                }).filter((e) => e);
                if (newData.indexOf(fixedData) >= 0) {
                    newNameStringList.forEach((name) => {
                        if (nameStringList.indexOf(name) < 0) {
                            newData.splice(newData.indexOf(fixedData), 0, { id: maxid + 1, name: [name, 0] });
                            maxid++;
                        }
                    });
                }
                colorNameDic = {};
                newData.forEach((item) => {
                    if (item.id < 0 || !("color" in item)) return;
                    colorNameDic[item.name[0]] = item.color;
                });
                setNameStringList(newNameStringList);
                setData(newData);
            }
        }
        const AddDay = () => {
            const day = (columns.length - 4) / 2 + 1;
            setColumns(columns.concat([{ ...target_day, text: '' + day, dataField: 'target_day' + day, }, { ...action_day, dataField: 'action_day' + day, }]));
        }

        const rowStyle = (row, rowIndex) => {
            if (row.id < 0)
                return { backgroundColor: "#eee" };
            if (row.name && row.name[1] < roleLabelBgColor.length)
                return { backgroundColor: roleLabelBgColor[row.name[1]] };
        };
        const NameInputArea = () => {
            const playerIconChangeHandler = (event) => {
                setPlayerIsIcon(event.target.checked);
                playerIsIcon = event.target.checked;
            };
            const nameIconChangeHandler = (event) => {
                setNameIsIcon(event.target.checked);
                nameIsIcon = event.target.checked;
                const newColumns = columns.slice();
                const firstColumn = newColumns.shift();
                if (nameIsIcon) {
                    if (firstColumn.dataField === "name") newColumns.unshift(firstColumn);
                    else newColumns.splice(1, 0, firstColumn);
                } else {
                    if (firstColumn.dataField == "color") newColumns.unshift(firstColumn);
                    else newColumns.splice(1, 0, firstColumn);
                }
                newColumns[0].text = "　";
                newColumns[1].text = "名前";
                setColumns(newColumns);
            };
            const onClickReset = () => {
                if (window.confirm("入力内容をリセットしますか？")) {
                    const newdata = data.map((item) => {
                        if ("color" in item) return { id: item.id, name: [item.name[0], 0], color: item.color };
                        else return { id: item.id, name: [item.name[0], 0] };
                    });
                    const newColumns = defaultColumns.slice();
                    const firstColumn = newColumns.shift();
                    if (nameIsIcon) {
                        if (firstColumn.dataField === "name") newColumns.unshift(firstColumn);
                        else newColumns.splice(1, 0, firstColumn);
                    } else {
                        if (firstColumn.dataField == "color") newColumns.unshift(firstColumn);
                        else newColumns.splice(1, 0, firstColumn);
                    }
                    newColumns[0].text = "　";
                    newColumns[1].text = "名前";
                    setColumns(newColumns);
                    setData(newdata);
                }
            }
            return (
                <div>
                    <textarea cols="20" rows="12" value={nameText} onChange={onChangeText} placeholder="名前を改行区切りで入力出来るだけ短く（五文字以内）" />
                    <label>
                    <input
                        type="checkbox"
                        checked={PlayerIsIcon}
                        onChange={playerIconChangeHandler}
                        id="iconCheckBox"
                        style={{ marginLeft: "1rem" }}
                    />
                    アイコン</label>
                    <label>
                    <input
                        type="checkbox"
                        checked={NameIsIcon}
                        onChange={nameIconChangeHandler}
                        id="nameIconCheckBox"
                        style={{ marginLeft: "1rem" }}
                    />
                    名前欄アイコン</label>
                    <div>
                        <button onClick={onClickButton}>setName</button>
                        <button onClick={onClickReset} style={{ marginLeft: "1rem" }}>リセット</button>
                    </div>
                </div>
            );
        }
        const MemeArea = () => {
            return (
                <div>
                    <textarea style={{ width: "100vw", height: "20rem", border: "solid #ddd", outline: "none" }} placeholder="メモ" />
                </div>
            );
        }
        return (
            <div>
                <div >
                    <button onClick={AddDay}>翌日</button>
                    <Container>
                        <BootstrapTable
                            data={data}
                            columns={columns}
                            keyField="id"
                            bootstrap4={true}
                            cellEdit={cellEditFactory({ mode: "click", blurToSave: true, afterSaveCell: (oldValue, newValue, row, column) => { if (column.dataField === 'name') setRender(!render); } })}
                            rowStyle={rowStyle}
                        />
                    </Container>
                </div>
                {MemeArea()}
                {NameInputArea()}
            </div>

        );

    }


    // ========================================

    ReactDOM.render(
        <Game />,
        document.getElementById('root')
    );
}
