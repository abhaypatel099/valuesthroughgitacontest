import React, { Component } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import IMG1 from './assets/pageback.jpg';
import { toPng } from "html-to-image";

class App extends Component {
  certificateWrapper = React.createRef();
  state = {
    Name: ""
  };
  render() {
    return (
      <div className="App">
        <div className="Meta">
          <h1>Download</h1>
          <p>Please enter your text.</p>
          <input 
            type="text"
            placeholder="Please enter your name..."
            value={this.state.Name}
            onChange={(e) => {
              this.setState({ Name: e.target.value });
            }}
          />
          <button
            onClick={() => {
              if (this.certificateWrapper.current) {
                toPng(this.certificateWrapper.current, { cacheBust: true })
                  .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = "certificate.png";
                    link.href = dataUrl;
                    link.click();
                  })
                  .catch((err) => {
                    console.error("Error generating image", err);
                  });
              }
            }}
          >
            Download
          </button>


        </div>

        <div id="downloadWrapper" ref={this.certificateWrapper}>
          <div id="certificateWrapper">
            <p>{this.state.Name}</p>
            <img src={IMG1} alt="Certificate" />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
