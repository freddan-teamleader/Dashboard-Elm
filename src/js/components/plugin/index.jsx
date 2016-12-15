/*
|--------------------------------------------------------------------------
| Index.jsx
|--------------------------------------------------------------------------
|
| Welcome to your plugin.
|
*/
import Elm from 'react-elm-components'
import {Im} from "../../../elm/Im.elm"

((Dashboard, React) => {
	/**
	 * Create an Application by extending the Application class
	 * Read more about Application (https://github.com/Infomaker/Dashboard-Plugin/wiki/Application)
	*/
	class ChatApplication extends Dashboard.Application {
		constructor(props) {
			super(props)

			this.handleChange = this.handleChange.bind(this)
			this.updateCounter = null

			this.state = {
				config: props.config
			}
		}

		handleChange() {
			if (typeof this.updateCounter === "function") {
				this.updateCounter(66)
			}
		}

		render() {
			const GUI = Dashboard.GUI

			const setupPorts = ports => {
				this.updateCounter = ports.counter.send
				ports.output.subscribe(function(data) {
					alert(data)
//					this.setStates({
//						items: data
//					})
				});
			}

			let { items = [] } = this.state
			const results = items.map(item => {
				return {
					id: Dashboard.createUUID(),
					content: item
				}
			})


			return (
				// Use @plugin_bundle_class and the bundle in the manifest will be used as your class
				<GUI.Wrapper className="@plugin_bundle_class">
					<GUI.Title text={this.state.config.pluginTitle || "Chat"}/>
					<GUI.Button text="My button" onClick={this.handleChange} />
					<GUI.List items={results}/>
					<Elm src={Im} flags={""} ports={setupPorts} />
				</GUI.Wrapper>
			)
		}
	}

	/**
	 * Create an Agent by extending the Agent class
	 * Read more about Agent (https://github.com/Infomaker/Dashboard-Plugin/wiki/Agent)
	*/
	class Agent extends Dashboard.Agent {
		constructor() {
			super()

			this.connect()
		}

		/**
		 * This is a example of a super simple agent. Your agent should do something more meaningful than this :)
		*/
		connect() {

		}
	}

	/**
	 * Create settings for you plugin by extending the Dashboard.Settings component
	*/
	class Settings extends Dashboard.Settings {
		// Plugin settings will be displayed in the store. These settings will be available for Agent, Widget and Application.
		plugin() {
			return <Dashboard.GUI.ConfigInput ref="pluginTitle" />
		}

		// Application settings will be displayed in application settings mode. These settings will only be available for the application.
		application() {
			return <Dashboard.GUI.ConfigInput ref="pluginTitle" />
		}
	}

	/**
	 * Register your plugin in the Dashboard.
	*/
	Dashboard.register({
		// Leave this be and it will fetch the data from your manifest file in the build steps
		bundle: "@plugin_bundle",

		// Only of of these are actually required. If you are developing a widget, just remove the application and agent.
		application: ChatApplication,
		agent: Agent,

		// Settings is optional.
		settings: Settings
	})

})(window.Dashboard, window.React)
