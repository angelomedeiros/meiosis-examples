import * as React from "react";
import Dialog from "material-ui/Dialog";
import { Model, Propose } from "../root/types";
import { ComponentConfig, VDom, View } from "./types";

const view: View<Model, Propose> = function(model: Model): VDom {
  return (
    <Dialog open={model.inProgress} title="Loading" modal={true} actions={[]}>
      Please wait... (this delay is actually faked on the server for demonstration purposes.)
    </Dialog>
  );
}

export function progressDialogConfig(): ComponentConfig<Model, Propose> {
  return { view };
}
