import React from "react";
import { HTMLTable } from "@blueprintjs/core";

export default class TaskFeedback extends React.Component {
  render() {
    const { game, player, round } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    const other = otherPlayers.length !== 0 ? otherPlayers[0] : null;
    const otherPlayerFeedback = game.treatment.otherPlayerFeedback !== undefined
      ? game.treatment.otherPlayerFeedback
      : true;

    const revealBots = game.treatment.revealBots || false;

    return (
      <div className="task-feedback">
        <HTMLTable>
          <thead>
            <tr>
              <th></th>
              <th>Guess</th>
              <th>Outcome</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>You</th>
              <td align="center">{player.round.get("value")}</td>
              <td>{round.get("model_prediction") === 'Yes' ? 'Match' : 'No match'}</td>
              <td>
                <strong>{(1 - player.round.get("score")).toFixed(2)}</strong>
              </td>
            </tr>
            {other && otherPlayerFeedback ? (
              <tr>
                <th>{revealBots ? "A.I." : "Other Player"}</th>
                <td align="center">{other.round.get("value").toFixed(2)}</td>
                <td>{round.get("model_prediction") === 'Yes' ? 'Match' : 'No match'}</td>
                <td>
                  <strong>{(1 - other.round.get("score")).toFixed(2)}</strong>
                </td>
              </tr>
            ) : null}
          </tbody>
        </HTMLTable>
      </div>
    );
  }
}
