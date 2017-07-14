/**
 * Created by NICK on 15/10/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
define(["require", "exports", "controllers/home/index", "controllers/home/side_nav_left", "controllers/home/side_nav_right", "controllers/form/editpsw_controller", "controllers/form/setaliasname_controller", "controllers/form/setmail_controller", "controllers/form/setmobile_controller", "controllers/form/set_computer_controller", "controllers/account/forget_email_controller", "controllers/account/forget_phone_controller", "controllers/account/login_controller", "controllers/account/register_controller", "controllers/pages/manager_controller", "controllers/pages/manager_form_controller", "controllers/permission/groups/manager_permiss_controller", "controllers/permission/actors/manager_group_controller", "controllers/chart/chart_controller", "controllers/pages/pageform_controller"], function (require, exports, home_index, home_side_nav_left, home_side_nav_right, editpsw, setaliasename, setmail, setmobile, setcomputer, forgetemail, forgetphone, login, reg, page, pageform, gpcpermiss, aormgropu, chart, form) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import mmc = require('controllers/permission/menus/manager_controller');
    //import mmcadd = require('controllers/permission/menus/manager_add_controller');
    //import mmcedit = require('controllers/permission/menus/manager_edit_controller');
    //import atc = require('controllers/permission/actions/manager_controller');
    //import atcadd = require('controllers/permission/actions/manager_add_controller');
    //import atcedit= require('controllers/permission/actions/manager_edit_controller');
    //import gpc = require('controllers/permission/groups/manager_controller');
    //import gpcadd = require('controllers/permission/groups/manager_add_controller');
    //import gpcedit= require('controllers/permission/groups/manager_edit_controller');
    //import gec = require('controllers/permission/genres/manager_controller');
    //import gecadd = require('controllers/permission/genres/manager_add_controller');
    //import gecedit = require('controllers/permission/genres/manager_edit_controller');
    //import aorm = require('controllers/permission/actors/manager_controller');
    //import aormadd = require('controllers/permission/actors/manager_add_controller');
    //import aormedit = require('controllers/permission/actors/manager_edit_controller');
    //import psc = require('controllers/permission/persons/manager_controller');
    //import pscadd = require('controllers/permission/persons/manager_add_controller');
    //import pscedit = require('controllers/permission/persons/manager_edit_controller');
    //import intc = require('controllers/permission/interfaces/manager_controller');
    //import intcadd = require('controllers/permission/interfaces/manager_add_controller');
    //import intcedit = require('controllers/permission/interfaces/manager_edit_controller');
    //import aic = require('controllers/permission/actioninterfaces/manager_controller');
    //import aicadd = require('controllers/permission/actioninterfaces/manager_add_controller');
    //import aicedit = require('controllers/permission/actioninterfaces/manager_edit_controller');
    //import schc = require('controllers/permission/schemas/manager_controller');
    //import schcadd = require('controllers/permission/schemas/manager_add_controller');
    //import schcedit = require('controllers/permission/schemas/manager_edit_controller');
    var Controllers = (function () {
        function Controllers(module) {
            module.controller(home_index.Controller._name, home_index.Controller)
                .controller(home_side_nav_left.Controller._name, home_side_nav_left.Controller)
                .controller(home_side_nav_right.Controller._name, home_side_nav_right.Controller)
                .controller(editpsw.Controller._name, editpsw.Controller)
                .controller(setaliasename.Controller._name, setaliasename.Controller)
                .controller(setmail.Controller._name, setmail.Controller)
                .controller(setmobile.Controller._name, setmobile.Controller)
                .controller(forgetemail.Controller._name, forgetemail.Controller)
                .controller(forgetphone.Controller._name, forgetphone.Controller)
                .controller(login.Controller._name, login.Controller)
                .controller(reg.Controller._name, reg.Controller)
                .controller(page.Controller._name, page.Controller)
                .controller(pageform.Controller._name, pageform.Controller)
                .controller(gpcpermiss.Controller._name, gpcpermiss.Controller)
                .controller(aormgropu.Controller._name, aormgropu.Controller)
                .controller(setcomputer.Controller._name, setcomputer.Controller)
                .controller(chart.Controller._name, chart.Controller)
                .controller(form.Controller._name, form.Controller);
        }
        return Controllers;
    }());
    exports.Controllers = Controllers;
});
//# sourceMappingURL=controllers.js.map