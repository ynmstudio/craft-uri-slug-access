!function(){var e;e=jQuery,Craft.SitesAdmin=Garnish.Base.extend({$groups:null,$selectedGroup:null,init:function(){var t=this;this.$groups=e("#groups"),this.$selectedGroup=this.$groups.find("a.sel:first"),this.addListener(e("#newgroupbtn"),"activate","addNewGroup");var a=e("#groupsettingsbtn");a.length&&(a.data("menubtn").settings.onOptionSelect=function(a){var i=e(a);if(!i.hasClass("disabled"))switch(i.data("action")){case"rename":t.renameSelectedGroup();break;case"delete":t.deleteSelectedGroup()}})},addNewGroup:function(){var e=this;this.promptForGroupName("").then((function(t){if(t){var a={name:t};Craft.postActionRequest("sites/save-group",a,(function(t,a){if("success"===a)if(t.success)location.href=Craft.getUrl("settings/sites",{groupId:t.group.id});else if(t.errors){var i=e.flattenErrors(t.errors);alert(Craft.t("app","Could not create the group:")+"\n\n"+i.join("\n"))}else Craft.cp.displayError()}))}})).catch((function(){}))},renameSelectedGroup:function(){var e=this;this.promptForGroupName(this.$selectedGroup.data("raw-name")).then((function(t){var a={id:e.$selectedGroup.data("id"),name:t};Craft.postActionRequest("sites/save-group",a,(function(a,i){if("success"===i)if(a.success)e.$selectedGroup.text(a.group.name),e.$selectedGroup.data("raw-name",t),Craft.cp.displayNotice(Craft.t("app","Group renamed."));else if(a.errors){var n=e.flattenErrors(a.errors);alert(Craft.t("app","Could not rename the group:")+"\n\n"+n.join("\n"))}else Craft.cp.displayError()}))})).catch((function(){}))},promptForGroupName:function(t){return new Promise((function(a,i){Craft.sendActionRequest("POST","sites/rename-group-field",{data:{name:t}}).then((function(n){var s=e("<form/>",{class:"modal prompt"}).appendTo(Garnish.$bod),o=e("<div/>",{class:"body"}).append(n.data.html).appendTo(s),r=e("<div/>",{class:"buttons right"}).appendTo(o),l=e("<button/>",{type:"button",class:"btn",text:Craft.t("app","Cancel")}).appendTo(r);e("<button/>",{type:"submit",class:"btn submit",text:Craft.t("app","Save")}).appendTo(r),Craft.appendBodyHtml(n.data.js);var d=!1,c=new Garnish.Modal(s,{onShow:function(){setTimeout((function(){Craft.setFocusWithin(o)}),100)},onHide:function(){d||i()}});s.on("submit",(function(i){i.preventDefault();var n=e(".text",o).val();n&&n!==t&&(a(n),d=!0),c.hide()})),l.on("click",(function(){c.hide()}))}))}))},deleteSelectedGroup:function(){if(confirm(Craft.t("app","Are you sure you want to delete this group?"))){var e={id:this.$selectedGroup.data("id")};Craft.postActionRequest("sites/delete-group",e,(function(e,t){"success"===t&&(e.success?location.href=Craft.getUrl("settings/sites"):Craft.cp.displayError())}))}},flattenErrors:function(e){var t=[];for(var a in e)e.hasOwnProperty(a)&&(t=t.concat(e[a]));return t}}),Craft.SiteAdminTable=Craft.AdminTable.extend({confirmDeleteModal:null,$rowToDelete:null,$deleteActionRadios:null,$deleteSubmitBtn:null,_deleting:!1,confirmDeleteItem:function(e){var t=this;return this.confirmDeleteModal&&(this.confirmDeleteModal.destroy(),delete this.confirmDeleteModal),this._createConfirmDeleteModal(e),Garnish.isMobileBrowser(!0)||setTimeout((function(){t.$deleteActionRadios.first().trigger("focus")}),100),!1},validateDeleteInputs:function(){var e=this.$deleteActionRadios.eq(0).prop("checked")||this.$deleteActionRadios.eq(1).prop("checked");return e?this.$deleteSubmitBtn.removeClass("disabled"):this.$deleteSubmitBtn.addClass("disabled"),e},submitDeleteSite:function(e){var t=this;if(e.preventDefault(),!this._deleting&&this.validateDeleteInputs()){this.$deleteSubmitBtn.addClass("loading"),this.disable(),this._deleting=!0;var a={id:this.getItemId(this.$rowToDelete)};this.$deleteActionRadios.eq(0).prop("checked")&&(a.transferContentTo=this.$transferSelect.val()),Craft.postActionRequest(this.settings.deleteAction,a,(function(e,a){t.$deleteSubmitBtn.removeClass("loading"),"success"===a&&(t._deleting=!1,t.enable(),t.confirmDeleteModal.hide(),t.handleDeleteItemResponse(e,t.$rowToDelete))}))}},_createConfirmDeleteModal:function(t){this.$rowToDelete=t;var a=this.getItemId(t),i=this.getItemName(t),n=e('<form id="confirmdeletemodal" class="modal fitted" method="post" accept-charset="UTF-8"/>').appendTo(Garnish.$bod),s=e('<div class="body"><p>'+Craft.t("app","What do you want to do with any content that is only available in {language}?",{language:i})+'</p><div class="options"><label><input type="radio" name="contentAction" value="transfer"/> '+Craft.t("app","Transfer it to:")+'</label> <div id="transferselect" class="select"><select/></div></div><div><label><input type="radio" name="contentAction" value="delete"/> '+Craft.t("app","Delete it")+"</label></div></div>").appendTo(n),o=e('<div class="buttons right"/>').appendTo(s),r=e("<button/>",{type:"button",class:"btn",text:Craft.t("app","Cancel")}).appendTo(o);this.$deleteActionRadios=s.find("input[type=radio]"),this.$transferSelect=e("#transferselect").find("> select"),this.$deleteSubmitBtn=Craft.ui.createSubmitButton({class:"disabled",label:Craft.t("app","Delete {site}",{site:i}),spinner:!0}).appendTo(o);for(var l=0;l<Craft.sites.length;l++)Craft.sites[l].id!=a&&this.$transferSelect.append('<option value="'+Craft.sites[l].id+'">'+Craft.escapeHtml(Craft.sites[l].name)+"</option>");this.confirmDeleteModal=new Garnish.Modal(n),this.addListener(r,"click",(function(){this.confirmDeleteModal.hide()})),this.addListener(this.$deleteActionRadios,"change","validateDeleteInputs"),this.addListener(n,"submit","submitDeleteSite")}})}();
//# sourceMappingURL=sites.js.map