import React, { Component, createRef, Fragment } from "react";
// import axios from 'axios';

import "./CreateForm.css";
import $ from "jquery";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

// Inicio set Builder
let fbEditor = document.getElementById("build-wrap");
let formBuilder = $(fbEditor).formBuilder();
//Fin set Builder

export default class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: "",
      inputDescription: "",
      mensajeErrorName: false,
      mensajeErrorDescription: false,
    };
    this.createPoll = this.createPoll.bind(this);
    this.fb = createRef();
  }

  componentDidMount() {
    var options = {
      disableFields: ["file", "button"],
      disabledActionButtons: ["data"],
      i18n: {
        // locale: "es-ES",
        override: {
          "en-US": {
            addOption: "Agregar opción +",
            allFieldsRemoved: "Se eliminaron todos los campos",
            allowMultipleFiles: "Permitir que los usuarios carguen varios archivos",
            autocomplete: "Autocompletado",
            button: "Botón",
            cannotBeEmpty: "Este campo no puede estar vacío",
            checkboxGroup: "Checkboxes",
            className: "Clase",
            clearAllMessage: "¿Estás seguro que deseas borrar todos los campos?",
            clear: "Eliminar",
            close: "Cerrar",
            content: "Contenido",
            copy: "Copiar a portapapeles",
            copyButton: "&#43;",
            copyButtonTooltip: "Copiar",
            dateField: "Fecha",
            description: "Texto de Ayuda",
            descriptionField: "Descripción",
            devMode: "Developer Mode",
            editNames: "Editar Nombres",
            editorTitle: "Form Elements",
            editXML: "Edit XML",
            enableOther: "Enable &quot;Other&quot;",
            enableOtherMsg: "Let users to enter an unlisted option",
            fieldNonEditable: "Este campo no se puede editar.",
            fieldRemoveWarning: "¿Estás segura de que quieres eliminar este campo?",
            fileUpload: "Subir archivo",
            formUpdated: "Formulario actualizado",
            getStarted: "Arrastre un campo de la derecha a esta área.",
            header: "Cabecera",
            hide: "Editar",
            hidden: "Campo oculto",
            inline: "Inline",
            inlineDesc: "Display {type} inline",
            label: "Label",
            labelEmpty: "La etiqueta de campo no puede estar vacía",
            limitRole: "Limite el acceso a uno o más de los siguientes roles:",
            mandatory: "Mandatory",
            maxlength: "Max Length",
            minOptionMessage: "Este campo requiere un mínimo de 2 opciones",
            multipleFiles: "Multiple Files",
            name: "Nombre",
            no: "No",
            noFieldsToClear: "There are no fields to clear",
            number: "Numero",
            off: "Off",
            on: "On",
            option: "Option",
            options: "Options",
            optional: "optional",
            optionLabelPlaceholder: "Label",
            optionValuePlaceholder: "Value",
            optionEmpty: "Option value required",
            other: "Other",
            paragraph: "Parrafo",
            placeholder: "Placeholder",
            "placeholder.value": "Value",
            "placeholder.label": "Label",
            "placeholder.text": "",
            "placeholder.textarea": "",
            "placeholder.email": "Ingrese su correo electrónico",
            "placeholder.placeholder": "",
            "placeholder.className": "Clases separadas por espacios",
            "placeholder.password": "Ingresa tu contraseña",
            preview: "Preview",
            radioGroup: "Grupo de Selección",
            radio: "Radio",
            removeMessage: "Eliminar elemento",
            removeOption: "Eliminar opción",
            remove: "&#215;",
            required: "Requerido",
            richText: "Editor de texto enriquecido",
            roles: "Acceso",
            rows: "Rows",
            save: "Guardar",
            selectOptions: "Options",
            select: "Menu desplegable",
            selectColor: "Seleccionar el color",
            selectionsMessage: "Multiples selecciones",
            size: "Size",
            "size.xs": "Extra Small",
            "size.sm": "Small",
            "size.m": "Default",
            "size.lg": "Large",
            style: "Style",
            styles: {
              btn: {
                default: "Default",
                danger: "Danger",
                info: "Info",
                primary: "Primary",
                success: "Success",
                warning: "Warning",
              },
            },
            subtype: "Type",
            text: "Campo de texto",
            textArea: "Area de Texto",
            toggle: "Toggle",
            warning: "Warning!",
            value: "Value",
            viewJSON: "{  }",
            viewXML: "&lt;/&gt;",
            yes: "Si",
          },
        },
      },
      onSave: (formData) => {
        //Auto binds `this`
        //valor de campos a ingresar
        //const datosFormBuilder = formBuilder.formData;
        this.createPoll();
        // console.log(formBuilder.formData);
        //this.props.addForm(options);
      },
    };

    $(this.fb.current).formBuilder(options);
  }

  handleChange(event) {
    let value = event.target.value;
    //console.log(value);
    let result = value === "clear" ? "" : value;
    this.setState({ [event.target.name]: result });
    //this.setState({...values, [e.target.name]: e.target.value});
  }

  createPoll = async (e) => {
    const isValid = this.validateVacio();

    if (isValid) {
      const formulariocreado = formBuilder.formData;

      const args = {
        nombre: this.state.inputName,
        descripcion: this.state.inputDescription,
        formulario: formulariocreado === null || formulariocreado === "" ? null : JSON.parse(formulariocreado),
      };

      // ENVIAR DATA A BACKEND
      alert("Mira la consola del Navegador");
      console.log(args);
    }
  };

  validateVacio = () => {
    let errorName = false;
    let errorDescription = false;

    if (this.state.inputName === "" && this.state.inputDescription === "") {
      errorName = true;
      errorDescription = true;
    } else if (this.state.inputName === "") {
      errorName = true;
    } else if (this.state.inputDescription === "") {
      errorDescription = true;
    } else if (this.state.inputName === null || this.state.inputDescription === null) {
      errorDescription = true;
    }

    if (errorName || errorDescription) {
      this.setState({
        mensajeErrorName: errorName,
        mensajeErrorDescription: errorDescription,
      });
      return false;
    }
    return true;
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row pt-5 pb-4">
            <div className="col">
              <h3>Configuración:</h3>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <form action="#" noValidate>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="inputNombreEncuesta">Nombre de la Encuesta</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputNombreEncuesta"
                        name="inputName"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.inputName}
                        placeholder={"Ingrese título de la Encuesta"}
                      />
                      {this.state.mensajeErrorName && this.state.inputName === "" ? (
                        <span style={{ color: "red", fontSize: "11px" }}>*Campo Requerido</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="inputDescripcionEncuesta">Descripción</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputDescripcionEncuesta"
                        name="inputDescription"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.inputDescription}
                        placeholder={"Ingrese descripción de la Encuesta"}
                      />
                      {this.state.mensajeErrorDescription && this.state.inputDescription === "" ? (
                        <span style={{ color: "red", fontSize: "11px" }}>*Campo Requerido</span>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* <button type="submit">DATA</button> // SE COMENTA YA QUE LA LIBRERÍA USA UN EVENTO PROPIO */}
              </form>
            </div>
          </div>

          <div id="fb-editor" ref={this.fb} />
        </div>
      </Fragment>
    );
  }
}
