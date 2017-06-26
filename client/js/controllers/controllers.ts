/**
 * Created by NICK on 15/10/13.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require('ref');
import home_index = require('controllers/home/index');
import home_side_nav_left = require('controllers/home/side_nav_left');
import home_side_nav_right = require('controllers/home/side_nav_right');

import editpsw = require('controllers/form/editpsw_controller');
import setaliasename = require('controllers/form/setaliasname_controller');
import setmail = require('controllers/form/setmail_controller');
import setmobile = require('controllers/form/setmobile_controller');
import setcomputer = require('controllers/form/set_computer_controller');

import forgetemail = require('controllers/account/forget_email_controller');
import forgetphone = require('controllers/account/forget_phone_controller');
import login = require('controllers/account/login_controller');
import reg = require('controllers/account/register_controller');

import page = require('controllers/pages/manager_controller');
import pageform = require('controllers/pages/manager_form_controller');

import gpcpermiss= require('controllers/permission/groups/manager_permiss_controller');
import aormgropu = require('controllers/permission/actors/manager_group_controller');

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

export class Controllers {
    constructor(module:ng.IModule) {
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

            //.controller(aorm.Controller._name, aorm.Controller)
            //.controller(aormadd.Controller._name, aormadd.Controller)
            //.controller(aormedit.Controller._name, aormedit.Controller)
            //.controller(gpc.Controller._name, gpc.Controller)
            //.controller(gpcadd.Controller._name, gpcadd.Controller)
            //.controller(gpcedit.Controller._name, gpcedit.Controller)
            //.controller(psc.Controller._name, psc.Controller)
            //.controller(pscadd.Controller._name, pscadd.Controller)
            //.controller(pscedit.Controller._name, pscedit.Controller)
            //.controller(aic.Controller._name, aic.Controller)
            //.controller(aicadd.Controller._name, aicadd.Controller)
            //.controller(aicedit.Controller._name, aicedit.Controller)
            //.controller(schc.Controller._name, schc.Controller)
            //.controller(schcadd.Controller._name, schcadd.Controller)
            //.controller(schcedit.Controller._name, schcedit.Controller)
            //.controller(gec.Controller._name, gec.Controller)
            //.controller(gecadd.Controller._name, gecadd.Controller)
            //.controller(gecedit.Controller._name, gecedit.Controller)
            //.controller(intc.Controller._name, intc.Controller)
            //.controller(intcadd.Controller._name, intcadd.Controller)
            //.controller(intcedit.Controller._name, intcedit.Controller)
            //.controller(atc.Controller._name, atc.Controller)
            //.controller(atcadd.Controller._name, atcadd.Controller)
            //.controller(atcedit.Controller._name, atcedit.Controller)
            //.controller(atc.Controller._name, atc.Controller)
            //.controller(atcadd.Controller._name, atcadd.Controller)
            //.controller(atcedit.Controller._name, atcedit.Controller)
        ;
    }
}