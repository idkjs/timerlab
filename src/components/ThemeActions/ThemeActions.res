open CssJs
open CssHelpers

let addIcon = Helpers.import_("./add.svg")
let editIcon = Helpers.import_("./edit.svg")

let button = textColor =>
  style(.[
    fontSize(1.->rem),
    color(textColor),
    Theme.Fonts.text,
    noOutline,
    noBorder,
    background(transparent),
    padding(zero),
    margin(zero),
    cursor(pointer),
    fontWeight(#num(500)),
    display(#flex),
    alignItems(center),
    marginLeft(1.->rem),
    selector(. "img", [marginRight(0.75->rem)]),
  ])

let wrapper = style(.[display(#flex), justifyContent(flexEnd)])

module Add = {
  @react.component
  let make = (~onClick) =>
    <button
      onClick={e => {
        Helpers.preventDefault(e)
        onClick(e)
      }}
      className={button(Theme.Colors.primary)}>
      <img src=addIcon /> {"Create theme"->React.string}
    </button>
}

module Edit = {
  @react.component
  let make = (~onClick) =>
    <button
      onClick={e => {
        Helpers.preventDefault(e)
        onClick()
      }}
      className={button("FF6635"->Css.hex)}>
      <img src=editIcon /> {"Edit theme"->React.string}
    </button>
}

@react.component
let make = (~children) => <div className=wrapper> children </div>
