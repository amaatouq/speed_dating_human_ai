import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import SocialExposure from "./SocialExposure.jsx";
import TaskFeedback from "./TaskFeedback.jsx";
import Task from "./Task.jsx";
import { Button } from "@blueprintjs/core";
import { Centered } from "meteor/empirica:core";

export default class Round extends React.Component {
  renderRound() {
    const { round, stage, player, game } = this.props;
    return (
      <div className="round">
        <div className="content">
          <PlayerProfile
            player={player}
            stage={stage}
            game={game}
            round={round}
          />
          <Task game={game} round={round} stage={stage} player={player} />
          {stage.get("type") === "social" ? (
            <SocialExposure
              stage={stage}
              player={player}
              game={game}
              round={round}
            />
          ) : null}
          {stage.get("type") === "feedback" ? (
            <TaskFeedback game={game} player={player} round={round} />
          ) : null}
        </div>
      </div>
    );
  }

  renderInstructions() {
    const { round, stage, player, game } = this.props;
    return (
      <Centered>
        <div className="instructions in-game-instruction">
          <h1 className={"bp3-heading"}>
            {" "}
            Instructions - Interactive Round *place holder*
          </h1>

          {!game.treatment.revealBots ? (
            <div>
              <p>
                Now we provide the other player's predictions for your last
                forecasts.
              </p>
              <p>
                You can decide whether or not to modify the predictions made in
                the previous step. You can choose to modify your predictions at
                any point. If you want to modify your results, select the value
                you want, otherwise please reselect the same value.
              </p>
            </div>
          ) : game.treatment.interpretationType === "Global" ? (
            <div>
              <p>
                Now we provide the A.I. model predictions for your last
                forecasts.
              </p>
              <p>
                The A.I. algorithm was trained based on data from 2,080 dates
                and the actual outcomes (i.e. whether a match was successful or
                not). The following chart explains which factors or attributes
                the A.I. algorithm weighs more as it arrives at its predictions.
              </p>
              <img
                className="interpretation-image"
                src="\task\tasks\global.png"
              />
              <p>
                According to A.I. algorithm,{" "}
                <b>
                  <i>Fun</i>
                </b>
                ,{" "}
                <b>
                  <i>Attractiveness</i>
                </b>{" "}
                and{" "}
                <b>
                  <i>Shared Interests</i>
                </b>{" "}
                of an attendee are the most important factors influencing the
                match probabilities. The next most important factors are the{" "}
                <b>
                  <i>differences in attractiveness and shared interests</i>
                </b>{" "}
                between participant and her partner.
              </p>
              <p>
                On the other hand, the algorithm indicates that{" "}
                <b>
                  <i>sincerity</i>
                </b>{" "}
                or{" "}
                <b>
                  <i>ambition</i>
                </b>{" "}
                have little effect on whether a speed date will be result in a
                match. Whether the attendee and her partner are of the{" "}
                <b>
                  <i>same race</i>
                </b>{" "}
                is determined to be the least important factor.
              </p>
              <p>
                You can decide whether or not to modify the predictions made in
                the previous step. You can choose to modify your predictions at
                any point. If you want to modify your results, select the value
                you want, otherwise please reselect the same value.
              </p>
            </div>
          ) : game.treatment.interpretationType === "Local" ? (
            <div>
              <p>
                Now we provide the A.I. model predictions for your last
                forecast. The A.I. algorithm was trained based on data from
                2,080 dates and the actual outcomes (i.e. whether a match was
                successful or not).{" "}
              </p>
              <img className="interpretation-image" src="\task\tasks\237.png" />
              <p>
                The chart above explains which factors or attributes of the
                dating couple were the primary drivers of the algorithm’s
                prediction of 16%. For example, in the following case, the
                predicted matching probability of the algorithm is comparatively
                low of 16%. According to the algorithm, the attendee got a high
                score for{" "}
                <b>
                  <i>Shared Interests</i>
                </b>{" "}
                from her partner), so it raised the matching probability as much
                as 12% compared to average cases. On the other hand, relatively
                low score of{" "}
                <b>
                  <i>Attractiveness</i>
                </b>{" "}
                and{" "}
                <b>
                  <i>Fun</i>
                </b>{" "}
                had negative effects on the match probability of this attendee
                by as much as 22% and 18%.
              </p>
              <p>
                You can decide whether or not to modify the predictions made in
                the previous step. You can choose to modify your predictions at
                any point. If you want to modify your results, select the value
                you want, otherwise please reselect the same value.
              </p>
            </div>
          ) : (
            <div>
              <p>
                Now we provide the A.I. model predictions for your last
                forecasts.
              </p>
              <p>
                You can decide whether or not to modify the predictions made in
                the previous step. You can choose to modify your predictions at
                any point. If you want to modify your results, select the value
                you want, otherwise please reselect the same value.
              </p>
              <p>
                If you want to modify your results, select the value you want,
                otherwise please reselect the same value.
              </p>
            </div>
          )}

          <form>
            <Button
              type="submit"
              intent={"primary"}
              small={false}
              fill={true}
              onClick={() => {
                player.stage.submit();
              }}
            >
              Start the revision of previous cases
            </Button>
          </form>
        </div>
      </Centered>
    );
  }

  render() {
    const { round, stage, player, game } = this.props;
    console.log("inst", round.get("instruction"));
    return round.get("case") === "instruction"
      ? this.renderInstructions()
      : this.renderRound();
  }
}
