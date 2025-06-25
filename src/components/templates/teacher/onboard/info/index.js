import React from "react";
import Select from "../../../../atoms/select";
import InputField from "../../../../atoms/input";
import "./index.css";
import CreatableSelect from "../../../../atoms/creatableSelect";
import { CountryDropdown } from "react-country-region-selector";
import Datetime from "react-datetime";
import checkMark from "../../../../../assets/icons/check_circle_black_18dp.svg";
import uploadImg from "../../../../../assets/icons/cloud_upload_white_24dp.svg";
import pencilImg from "../../../../../assets/icons/editing.png";
import "react-datetime/css/react-datetime.css";
import { isEmpty } from "lodash";
import moment from "moment";

const InfoForm = (props) => {
  const { formValues, fields, body, setFormValues, setBody } =
    props;
  const certificateRef = React.useRef();
  const [editTable, setEditTable] = React.useState(false);
  const [isAddDetails, setIsAddDetails] = React.useState(false);

  const handleChange = (val, key) => {
    const temp = { ...formValues };
    temp[key] = val;
    setFormValues(temp);
  };
  const handleFileInput = (event, key) => {
    console.log(event);
    if (event.target.files.length > 0) {
      handleChange(event.target.files[0], key);
    }
  };

  const handleTableEdit = (e, ind) => {
    setEditTable(true);
    let temp = [...body];
    setFormValues(temp[ind]);
    if (isAddDetails) {
      temp = [...temp, formValues];
    }
    temp.splice(ind, 1);
    setBody(temp);
  };
  const handleAddDetails = () => {
    const temp = {
      title: "",
      institute: "",
      locations: "",
      description: "",
      from: "",
      to: "",
      certificate_data: undefined,
    };
    setEditTable(true);
    setIsAddDetails(true, () => {
      // Function called after state update and component rerender
      if (isAddDetails || editTable) {
        setBody([...body, formValues]);
      }
    });
    setFormValues(temp);
  };

  const renderFields = (item) => {
    if (item.type === "String") {
      return (
        <InputField
          onChange={(e) => handleChange(e.target.value, item.key)}
          type={item.type}
          value={formValues[item.key]}
          placeholder={item.label}
          className={`infoInput ${item.key}`}
        />
      );
    }

    if (item.type === "Date") {
      return (
        <Datetime
          dateFormat="YYYY"
          className={`infoInput ${item.type}`}
          value={formValues[item.key]}
          inputProps={{ placeholder: item.label, value: formValues[item.key] }}
          timeFormat={false}
          closeOnSelect={true}
          onChange={(date) =>
            handleChange(moment(date).format("YYYY"), item.key)
          }
        />
      );
    }

    if (item.type === "file") {
      return (
        <div style={{ marginTop: "1vw" }} className="certificateDiv">
          <button
            onClick={() => certificateRef.current.click()}
            className="uploadCertificate"
            style={{backgroundColor: formValues[item.key] ? '#5fd65b' : ''}}
          >
            {formValues[item.key] ? (
              <div className="uploadCertificateLabel">
                <h2>Certificate Uploaded</h2>
                <img
                  className="uploadCertificateImg"
                  src={checkMark}
                  alt="uploadSuccess"
                />
              </div>
            ) : (
              <div className="uploadCertificateLabel">
                <h2>Upload Certificate</h2>
                <img
                  className="uploadCertificateImg"
                  src={uploadImg}
                  alt="uploadCertificate"
                />
              </div>
            )}
          </button>
          <input
            onChange={(e) => {
              handleFileInput(e, item.key);
            }}
            //value={formValues[item.key]}
            ref={certificateRef}
            type="file"
            style={{ display: "none" }}
          />
        </div>
      );
    }

    if (item.type === "Select") {
      if (item.key === "title") {
        return (
          <CreatableSelect
            className="infoInputSelect"
            classNamePrefix={"select"}
            onChange={(val) => handleChange(val.value, item.key)}
            value={
              !formValues[item.key]
                ? ""
                : { value: formValues[item.key], label: formValues[item.key] }
            }
            placeholder={item.label}
            name={item.label}
            options={item.options}
          />
        );
      }
      if (item.key === "locations") {
        return (
          <CountryDropdown
            classes={`infoInputSelectLocation`}
            defaultOptionLabel={item.label}
            value={formValues[item.key]}
            onChange={(val) => handleChange(val, item.key)}
          />
        );
      }
      return (
        <Select
          className="infoInputSelect"
          onChange={(val) => handleChange(val.value, item.key)}
          value={
            !formValues[item.key]
              ? ""
              : { value: formValues[item.key], label: formValues[item.key] }
          }
          placeholder={item.label}
          name={item.label}
          options={item.options}
        />
      );
    }
  };
  //colData.type==='Date'?moment().format():
  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            {fields.map(
              (header) =>
                header.key !== "certificate_data" &&
                header.key !== "description" && (
                  <th scope="col">{header.label}</th>
                )
            )}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {body.map((row, ind) => (
            <tr>
              {fields.map(
                (colData) =>
                  colData.key !== "certificate_data" &&
                  colData.key !== "description" && <td>{row[colData.key]}</td>
              )}
              <td>
                <img
                  className="uploadCertificateImg"
                  src={pencilImg}
                  alt="actionIcon"
                  onClick={(e) => handleTableEdit(e, ind)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="infoContainer">
      {!isEmpty(body) && <div className="infoTableDiv">{renderTable()}</div>}
      {(editTable || isEmpty(body)) && (
        <div className="infoFormContainer">
          {fields.map((item) => renderFields(item))}
        </div>
      )}
    
    </div>
  );
};

export default InfoForm;
