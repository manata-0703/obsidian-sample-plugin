import { Plugin, WorkspaceLeaf, ItemView } from "obsidian"

const VIEW_TYPE_POMODORO = "pomodoro-timer-view"

/**
 *
 */
export default class PomodoroPlugin extends Plugin {
	/**
	 *
	 */
	async onload() {
		this.registerView(VIEW_TYPE_POMODORO, (leaf) => new PomodoroView(leaf))

		this.addCommand({
			id: "open-pomodoro-view",
			name: "Open Pomodoro Timer",
			callback: () => {
				this.activateView()
			},
		})
	}

	/**
	 *
	 */
	async activateView() {
		const leaf = this.app.workspace.getLeftLeaf(false) // 左側ペインに開く
		await leaf.setViewState({
			type: VIEW_TYPE_POMODORO,
			active: true,
		})
		this.app.workspace.revealLeaf(leaf)
	}
}

/**
 *
 */
class PomodoroView extends ItemView {
	/**
	 *
	 */
	constructor(leaf: WorkspaceLeaf) {
		super(leaf)
	}

	/**
	 *
	 */
	getViewType() {
		return VIEW_TYPE_POMODORO
	}

	/**
	 *
	 */
	getDisplayText() {
		return "Pomodoro Timer"
	}

	/**
	 *
	 */
	async onOpen() {
		const container = this.containerEl.children[1]
		container.empty()
		container.createEl("h2", { text: "🍅 Pomodoro Timer Here!" })
		// ここにボタンやタイマーUIを追加していける
	}

	/**
	 *
	 */
	async onClose() {
		// クリーンアップ処理があればここに書く
	}
}
