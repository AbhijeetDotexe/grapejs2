const editor = grapesjs.init({
  container: "#gjs",
  fromElement: false,
  components: '<h1 style="text-align: center; color: slategrey">GrapeJS</h1>',
  attributes: { className: "bg-dark" },
  height: "90vh",
  width: "auto",
  
  storageManager: false,
  panels: { defaults: [] },

  blockManager: {
    appendTo: "#blocks",
  },

  panels: {
    
    defaults: [

      {
        id: "layers",
        el: ".panel__right",
        // Make the panel resizable
        resizable: {
          maxDim: 900,
          minDim: 500,
          tc: 0, // Top handler
          cl: 1, // Left handler
          cr: 0, // Right handler
          bc: 0, // Bottom handler
          // keyWidth: "flex-basis",
        },
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [{
            id: 'show-layers',
            active: true,
            label: `<i class="bi bi-stack"></i>`,
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          }, {
            id: 'show-style',
            active: true,
            label: `<i class="bi bi-border-style"></i>`,
            command: 'show-styles',
            togglable: false,
        }],
      }
    ],
    
  },

  StyleManger: {
    appendTo: ".styles-container",
    sectors: [
      {
        name: "Dimension",
        open: false,
        buildProps: ["width", "min-height", "padding"],
        properties: [
          {
            type: "integer",
            name: "The width",
            property: "width",
            units: ["px", "%"],
            defaults: "auto",
            min: 0,
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["background-color", "box-shadow", "custom-prop"],
            properties: [
              {
                id: "custom-prop",
                name: "Custom Label",
                property: "font-size",
                type: "select",
                defaults: "32px",
                options: [
                  { value: "12px", name: "Tiny" },
                  { value: "18px", name: "Medium" },
                  { value: "32px", name: "Big" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  selectorManager: {
    appendTo: ".styles-container",
  },

  layerManager: {
    appendTo: ".layers-container",
  },
});

editor.Panels.addPanel({
  id: "panel-top",
  el: ".panel__top",
});
editor.Panels.addPanel({
  id: "basic-actions",
  el: ".panel__basic-actions",
  buttons: [
    {
      id: "visibility",
      active: true, // active by default
      className: "btn-toggle-borders",
      label: `<i class="bi bi-border"></i>`,
      command: "sw-visibility", // Built-in command
    },
    {
      id: "export",
      className: "btn-open-export",
      label: `<i class="bi bi-code-slash"></i>`,
      command: "export-template",
      context: "export-template", // For grouping context of buttons from the same panel
    },
    {
      id: "show-json",
      className: "btn-show-json",
      label: `<i class="bi bi-filetype-json"></i>`,
      context: "show-json",
      command(editor) {
        editor.Modal.setTitle("Components JSON")
          .setContent(
            `<textarea style="width:100%; height: 250px;">
                  ${JSON.stringify(editor.getComponents())}
                </textarea>`
          )
          .open();
      },
    },
  ],
});


editor.BlockManager.add('Heading', {
  label: 'Heading',
  category: 'Typography',
  content: `<section>
        <h1 style="">paragraph</h1>
        </section>`
})

editor.BlockManager.add('Paragraph', {
  label: 'paragraph',
  category: 'Typography',
  content: `<section>
        <p style="">paragraph</p>
        </section>`
})

editor.BlockManager.add('Image', {
  label: 'Image',
  category: 'Media',
  content: {type:'image'}
})

editor.BlockManager.add('Video', {
  label: 'Video',
  category: 'Media',
  content: {type:'video'}
})

editor.BlockManager.add('Audio', {
  label: 'Audio',
  category: 'Media',
  content: `
            <audio controls>
               <source src="" type="audio/ogg">
               <source src="" type="audio/mpeg">
               Your browser does not support the audio tag.
            </audio>
            `,
})

editor.BlockManager.add('Navbar', {
  label: 'Navbar',
  category: 'Navigation',
  content: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar w/ text</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
    </ul>
    <span class="navbar-text">
    </span>
  </div>
</nav>`
})

editor.BlockManager.add('Button', {
  label: 'Button',
  category: 'Navigation',
  content: `
  <button type="button" class="btn">Button</button>
  `,
})



editor.Commands.add("show-layers", {
  getRowEl(editor) {
    return editor.getContainer().closest(".editor-row");
  },
  getLayersEl(row) {
    return row.querySelector(".layers-container");
  },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = "";
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = "none";
  },
});
editor.Commands.add("show-styles", {
  getRowEl(editor) {
    return editor.getContainer().closest(".editor-row");
  },
  getStyleEl(row) {
    return row.querySelector(".styles-container");
  },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = "";
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = "none";
  },
});
