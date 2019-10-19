addTmpl("main", "main",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui sidebar vertical left menu overlay visible noshadow\" style=\"display:table;-webkit-transition:width 0.3s !important; transition:width 0.3s !important; overflow:visible !important;position:absolute;\"><div class=\"item logo openbtn\"><img src=\"img/logo.svg\"><img src=\"img/logo.svg\" style=\"display:none\"></div><div class=\"ui accordion\"><a class=\"item\" onclick=\"mtrans('main/welcome', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.welcome",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item\" onclick=\"mtrans('main/run', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.run",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item DISASSEMBLER_USE\" onclick=\"mtrans('main/code', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.code",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item\" onclick=\"mtrans('main/probe', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.probe",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item\" onclick=\"mtrans('main/module', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.module",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item CHAT_USE\" onclick=\"mtrans('main/user_chat', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.chat",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item USER_EDIT\" onclick=\"mtrans('main/user', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.user",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item\" onclick=\"mtrans('main/user_account', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.account",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item\" onclick=\"mtrans('main/setting', this);\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.setting",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"item\" target=\"_blank\" href=\"#about\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"menu.about",{"name":"l","hash":{},"data":data}))
    + "</a><div class=\"menuend\"></div></div></div><div class=\"ui menu fixed mbar\" style=\"padding-left:260px;border-radius:0!important; border:0;-webkit-transition-duration:0.1s;padding-right:calc(20px - (100vw - 100%))\"><div id=\"topbar\"></div><div class=\"right menu item\"><span class=\"ui item icon\"><span id=\"mainName\"></span><i class=\"ui icon user\" style=\"margin-left:10px;\"></i></span><a class=\"ui item\" style=\"padding:1em;\" onclick=\"var t = this;(function(){var ctx=getCtx('main'),sub=ctx[''],f=function(event) {ctx.logout();};f.call(t, event)})()\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"bar.logout",{"name":"l","hash":{},"data":data}))
    + "</a></div></div><div class=\"main_content\" style=\"padding-left:260px;position:fixed;width:100%;height:calc(100% - 51px);-webkit-transition:padding-cleft 0.3s !important; transition:padding-left 0.3s !important;\"><div id=\"content\" class=\"pusher\" style=\"overflow-y:auto;height:100%;\"></div></div>";
},"useData":true},"");addTmpl("main/setting", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sgrid\"><div id=\"left\" class=\"ui segment\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.setting",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div></div><div id=\"center\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.cross",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"crossFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"crossFilter\" name=\"crossFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist crossList paging_inner content\"></div></div><div class=\"ui pagination menu crossPage fullw\"></div></div><div id=\"right\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.repos",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"repoFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"repoFilter\" name=\"repoFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist repoList paging_inner content\"></div></div><div class=\"ui pagination menu repoPage fullw\"></div></div></div>";
},"useData":true},"");addA("main/setting","setting",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
        sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addTmpl("main/setting", "topbar",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui edit dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.edit",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.repo",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/setting'),sub=ctx[''],f=function(event) {ctx.settAddR();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.add",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div></div><div class=\"ui visibility dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.vis",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vsett\" id=\"vsett\" checked=\"\"><label for=\"vsett\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.setting",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item ADMIN_ALL\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vcross\" id=\"vcross\"><label for=\"vcross\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.cross",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vrepo\" id=\"vrepo\" checked=\"\"><label for=\"vrepo\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.repos",{"name":"l","hash":{},"data":data}))
    + "</label></div></div></div></div>";
},"useData":true},"");addTmpl("main/setting", "modal",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui modal settingAddRepo\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.add",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.add_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"settingAddRepoE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"divide\" style=\"left:57.5%;bottom: -25px;\"></div><div class=\"ui grid\" style=\"padding:20px;\"><div style=\"width:calc(60% - 2rem);margin:0;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"setting.acfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/setting'),sub=ctx['setting_add_repo'],f=function(event) {ctx._setting_add_repo(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"add_url\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.url",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_url\" name=\"add_url\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"add_key\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.key",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"add_key\" name=\"add_key\" rows=\"3\"></textarea></div><div class=\"form-row\"><label for=\"add_desc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"add_desc\" name=\"add_desc\" rows=\"2\"></textarea></div></form></div></div></div><div style=\"width:40%;margin:0 0 0 2rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.agrp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"fullw\" style=\"height:calc(100% - 2rem);\"><div><div class=\"ui icon input tinput fl-wrap fullw\"><i class=\"angle up link toggl icon\"></i><label for=\"addFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"addFilter\" name=\"addFilter\" class=\"prompt fullw\" type=\"text\"><i class=\"search link icon\"></i></div></div><div class=\"ui segment fullw tlist\" style=\"height:calc(100% - 5rem);\"><div class=\"ui middle aligned celled selection list repoGroupList mlist fullw fullh\"></div></div><div class=\"ui pagination menu repoGroupPage fullw\"></div></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/setting'),sub=ctx['setting_add_repo'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div>";
},"useData":true},"");addA("main/setting","setting_add_repo",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.settingAddRepo', {'style':1, customEvent:autofill});
     });addS("main/setting", "_sid20","\n");addJ("main/setting","setting_add_repo",function(ctx, path, sub) { 
    var _this = this;
    var _canClose = true;
    var _modal = $('.ui.modal.settingAddRepo');
    var _btn = _modal.find('.accept.button');
    var sel = null;
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                    
    $('#add_url').on('input', onChange);
    $('#add_key').on('input', onChange);
                  
    function onChange() {
        var v = $('#add_name').val();
        if(v === '') {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    } 
                   
    sub.onOpen = function(after) {
        sub.after = after;
        submit_err(-1, true);
        var n = $('#add_url');
        label_reset(n);
        $('#addFilter')[0].reset();
        label_reset($('#add_desc'));
        label_reset($('#add_key'));
        sub.resetGroups();
        n.focus();
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
       var f = _modal.find('form'); 
       f.submit();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.settingAddRepoE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('setting.e_exist');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('setting.e_add');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
    this._setting_add_repo = function(ev, el_frm) {
        _canClose = false;
        ev.preventDefault();
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var data = {u:form_get(el_frm, 'add_url'),
                    d:form_get(el_frm, 'add_desc')
        };
        
        if(sel != null) {
            data.g = sel;
        }
        
        frm.append('data', '{"cmd":121}');
        var k = form_get(el_frm, 'add_key');
        if(k != '') {
            frm.append('password', k);
        }
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                data.n = data.u
                delete data.u;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
    (function() {
        var l = $('.repoGroupList');
        var p = $('.repoGroupPage');
        var n = {page:'main/setting',
                 sub:'setting_add_repo',
                 pg:'sub.requestGroups(p)',
                 kd:'sub.requestGroups(parseInt(this.value)-1, event)'
        };
        
        list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function(o) {
            sel = o.id;
            onChange();
        });
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        };
        
        sub.resetGroups = function() {
            sel = null;
            onChange();
            paging_reset(n);
            sub.requestGroups();
        }
        
        var s = list_search($('#addFilter'), sub.resetGroups);
        
        sub.requestGroups = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    post('/sys/server/', {data:JSON.stringify({cmd:15}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        render(r);
                    });
                }
            }, l, p, n, po);
        };
    })();
 });addS("main/setting", "_sid19","\n");addJ("main/setting","setting",function(ctx, path, sub) { 
    console.log('setting');
    var _this = this;
            
    $('#topbar .ui.edit.dropdown').dropdown({
       transition: 'fade up',
       context: 'body',
       action:'hide'
    });  
    
    this.settAddR = function() {
        $('.ui.modal.settingAddRepo').modal('show');
        ctx['setting_add_repo'].onOpen(function(d) {
            sub.onAddRepo(d);
        });
    };
    
    var lock = lock_post_init(sub);
    var rFilter = $('#repoFilter');
    var cFilter = $('#crossFilter');
    
    search_filter('#repoFilter', '#right');   
    search_filter('#crossFilter', '#center');   
    

    visibility_init(sub, $('#topbar .ui.visibility.dropdown'), function(i) { return sub.pane(i); });
    
    (function(){
        $('#center').css('display', 'none');
        var _ctx = {};
        var _sizes = [50, 25, 25];
        var _panes = ['#left', '#center', '#right'];
        
        sub.pane = function(i) {
            return _panes[i];
        }
        
        sub.split = function() {
            doSplit(_panes, _sizes, _ctx);
        }
        
        sub.split();
    })();

    (function() {
        _this.onChange = function() {
            
        };
    })();

    (function() {
        var l = $('.repoList');
        var p = $('.repoPage');
        var n = {page:'main/setting',
                 sub:'setting',
                 pg:'sub.requestRepos(p)',
                 kd:'sub.requestRepos(parseInt(this.value)-1, event)'
        };
        
        var nl = 0;
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChange);
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.onAddRepo = function(d) {
            if(l.find('.item').length == 0) {
                l.html('');
            }
            l.prepend(m(d));
            j(l.children().first());
        }
        
        sub.resetRepos = function() {
            paging_reset(n);
            sub.requestRepos();
        }
        
        var s = list_search(rFilter, sub.resetRepos);
        
        sub.lockList = function() {
            if(nl == 0) {
                rFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        sub.unlockList = function() {
            nl--;
            if(nl == 0) {
                rFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        sub.requestRepos = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            _this.onChange();
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:120}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        var rm = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/setting'),sub=ctx['setting'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('setting.rem', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('setting.e_rem'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:123}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        it.remove();
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.repoList .item', 
            callback:function(key, options) {
                _this.onChange();
                j()
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    

    (function() {
        var c = $('#center');
        var l = $('.crossList');
        var p = $('.crossPage');
        var n = {page:'main/setting',
                 sub:'setting',
                 pg:'sub.requestCross(p)',
                 kd:'sub.requestCross(parseInt(this.value)-1, event)'
        };
        
        var nl = 0;
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChange);
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.onAddCross = function(d) {
            if(l.find('.item').length == 0) {
                l.html('');
            }
            l.prepend(m(d));
            j(l.children().first());
        }
        
        sub.resetCross = function() {
            paging_reset(n);
            sub.requestCross();
        }
        
        var s = list_search(cFilter, sub.resetCross);
        
        sub.lockList = function() {
            if(nl == 0) {
                cFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        sub.unlockList = function() {
            nl--;
            if(nl == 0) {
                cFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        var rc = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            _this.onChange();
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:140}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        sub.requestCross = function(po, ev) {
            do_visible_split(c, function() {
                rc(po, ev)
            });
        }
        
        var rm = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/setting'),sub=ctx['setting'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('setting.rem', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('setting.e_rem'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:143}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        it.remove();
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.crossList .item', 
            callback:function(key, options) {
                _this.onChange();
                j()
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    sub.requestRepos();
    sub.requestCross();
 });addTmpl("main/user_account", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sgrid\"><div id=\"left\" class=\"ui segment\" style=\"width:100%;\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"account.setting",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div><div></div><div class=\"grid_c\"><form class=\"ui form form_c form-base\" onsubmit=\"event.preventDefault();\"><div class=\"form-row\"><label for=\"accountId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"accountId\" name=\"accountId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"accountName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"accountName\" name=\"accountName\"></div><div class=\"form-row\"><label for=\"accountLogin\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.login",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"accountLogin\" name=\"accountLogin\" disabled=\"\"></div><div class=\"form-row\"><label for=\"accountPwd\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"login.upwd",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"password\" id=\"accountPwd\" name=\"accountPwd\" autocomplete=\"new-apassword\"></div><div class=\"form-row\"><label for=\"accountMail\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.mail",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"accountMail\" name=\"accountMail\"></div><div class=\"form-row\"><div class=\"fullw fl-wrap fl-wrap-input upper\"><label class=\"fl-label\" style=\"z-index: 13;\" for=\"accountPerm\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.user_p",{"name":"l","hash":{},"data":data}))
    + "</label><div class=\"ui multiple search selection dropdown activeselect fullw disabled\" style=\"margin-bottom:10px;\"><input type=\"hidden\" name=\"accountPerm\" id=\"accountPerm\" value=\"\" autofocus=\"true\"><i class=\"dropdown icon\"></i><div class=\"default text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.user_p",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"menu\" style=\"overflow-y:auto;max-height:15rem;\"></div></div></div></div><div class=\"form-row accountEdit\"><button class=\"ui right blue button save\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.save",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"doclear\"></div><div class=\"ACCOUNT_REMOVE accountRemove\"><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"account.rem",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row accountRemBtn\"><button class=\"ui left blue button remove\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.rem",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"form-row accountConfirm frame hide\" style=\"width:30rem;padding:2rem;\"><div style=\"min-height:3rem;\"><span class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"account.drem",{"name":"l","hash":{},"data":data}))
    + "</span></div><div style=\"float:right;display:inline-block;\"><button class=\"ui blue deny button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/user_account'),sub=ctx['user_account'],f=function(event) { sub.rem_abort(); };f.call(t, event)})()\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "</button><button class=\"ui blue accept button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/user_account'),sub=ctx['user_account'],f=function(event) { sub.rem_do(); };f.call(t, event)})()\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"doclear\"></div></div></div></form></div></div></div>";
},"useData":true},"");addA("main/user_account","user_account",function(ctx, path, sub, load) { 
        function l() {
            if(!sub.load) {
                setTimeout(l, 200);
            } else {
                sub.load();
            }
        }
        if(load) {
            l();
        }
        if(sub.lb) {
            sub.lb.destroy();
        }
        sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addS("main/user_account", "_sid18","\n");addJ("main/user_account","user_account",function(ctx, path, sub) { 
    
    (function() {
        var b = $('body')
        var g = $('#left .grid_c');
        var d = g.find('.ui.dropdown');
        var m = g.find('.menu');
        var u = g.find('.upper');
        var sBtn = g.find('.button.save');
        var rBtn = g.find('.button.remove');
        var aId = g.find('#accountId');
        var aName = g.find('#accountName');
        var aLogin = g.find('#accountLogin');
        var aPwd = g.find('#accountPwd');
        var aMail = g.find('#accountMail');
        var aRem = g.find('.accountRemove');
        var aEdit = g.find('.accountEdit');
        var confirm = g.find('.accountConfirm');
        var remBtn = g.find('.accountRemBtn');
        
        var a_data = null;
        
        var loader = loader_init(g);
        var lerr = error_init(g, polyglot.t('main.eh_load'), polyglot.t('account.e_load'));
        var serr = error_init(g, polyglot.t('main.eh_save'), polyglot.t('account.e_save'));
        var rerr = error_init(g, polyglot.t('main.eh_rem'), polyglot.t('account.e_rem'));
        var lin = login_current();
        
        var _perms = perm_get_all();
        var pn = Object.getOwnPropertyNames(_perms);
        var admin = login_admin();
        var can_edit = !b.hasClass('NO_ACCOUNT_EDIT') || admin;
        var can_change_login = !b.hasClass('NO_USER_CHANGE_LOGIN') || admin;
        var can_remove = !b.hasClass('NO_ACCOUNT_REMOVE') || admin;
        var c = function() {};
        
        sBtn.attr('disabled', true);
        
        if(!can_remove) {
            aRem.addClass('hide');   
        }
        
        aName.attr('disabled', !can_change_login || !can_edit);
        aPwd.attr('disabled', !can_change_login || !can_edit);
        
        aMail.attr('disabled', !can_edit);
        
        if(!can_edit) {
            aEdit.addClass('hide');
        }
        
        pn.forEach(function(n, i) {
            m.append('<div class="item" data-value="' + i + '" data="' + n + '">' + polyglot.t('perm.' + n) + '</div>');
        });
         
        sub.getPerm = function() {
            return r;
        };
         
        sub.resetPerm = function() {
            d.dropdown('clear');
            r = 0;
        };
        
        sub.setOnPerm = function(f) {
            c = f;
        };
        
        var s = {
            forceSelection:false,
            selectOnKeydown:false,
            clearable:true,
            onAdd:function(addedValue, addedText, $addedChoice) {
                r |= _perms[$addedChoice.attr('data')];
                c();
            },
            onRemove:function(removedValue, removedText, $removedChoice) {
                r &= ~_perms[$removedChoice.attr('data')];
                a(!m.hasClass('visible') && r != 0);
                c();
            },
            onShow:function() {
                a(false);
            },
            onHide:function() {
                a(true && r != 0);
            }
        };
        
        var a = function(v) {
            if(v) {
                u.addClass('fl-is-active');
            } else {
                u.removeClass('fl-is-active');
            }
        }; 
         
        sub.setPerm = function(v) {
            var l = d.parent().find('.fl-label');
            l.css('transition', 'none');
            d.dropdown('clear');
            r = v;
            pn.forEach(function(n, i) {
                if(((1 << i) & v) != 0) {
                    d.dropdown('set selected', '' + i);
                }
            });
            d.dropdown('refresh');
            a(true && r != 0);
            domy.defer(function() {
                l.css('transition', '');
            });
        };
        
        d.dropdown(s);
        
        var ch = false;
        var wp = false;
        
        var oi = function() {
            if(wp && !ch) {
                ch = true;
                sBtn.attr('disabled', false);
            }
        };
        
        aName.on('input', oi);
        aPwd.on('input', oi);
        aMail.on('input', oi);
        
        sBtn.on('click', function() {
            var d = post_get_val(a_data,
                                ['n', 'm'],
                                ['a', 'b'],
                                [aName, aMail]);
            var hp = aPwd.val() != '';
            if(d || hp) { 
                loader.show();
                var c = d ? d.c : function() {};
                d = d ? d.r : null;
                var pd = {data:JSON.stringify({cmd:19})};
                if(hp) {
                    d = d == null ? {} : d;
                    pd.password = aPwd.val();
                }
                d.m = lin.id;
                pd.ext_data = JSON.stringify(d);
                post('/sys/server/', pd, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.hide();
                    if(r.r == 0) {
                        c();
                        ch = false;
                        sBtn.attr('disabled', true);
                    } else {
                        serr.show();
                    }
                });
            }
        });
        
        sub.rem_abort = function() {
            confirm.addClass('hide');
            remBtn.removeClass('hide');
        }
        
        sub.rem_do = function() {
            loader.show();
            post('/sys/server/', {data:JSON.stringify({cmd:4}), ext_data:JSON.stringify({a:lin.id})}, function(d) {
                var r = d.constructor === String ? JSON.parse(d) : d;
                loader.hide();
                if(r.r == 0) {
                    login_logout();
                } else {
                    rerr.show();
                }
            });
        }
        
        rBtn.on('click', function() {
            confirm.removeClass('hide');
            remBtn.addClass('hide');
        });
        
        sub.load = function() {
            wp = false;
            ch = false;
            loader.show();
            post('/sys/server/', {data:JSON.stringify({cmd:18}), ext_data:JSON.stringify({id:lin.id})}, function(d) {
                var r = d.constructor === String ? JSON.parse(d) : d;
                loader.hide();
                if(r.r == 0) {
                    label_set(aId, r.id);
                    label_set(aName, r.n);
                    label_set_date(aLogin, r.t);
                    label_set(aMail, r.m);
                    label_set(aPwd, '');
                    sub.setPerm(r.p);
                    a_data = r;
                } else {
                    a_data = null;
                    lerr.show();
                }
                wp = true;
            });
        }
    })();
 });addTmpl("main/user", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sgrid\"><div id=\"left\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.list",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"userFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"userFilter\" name=\"userFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist userList paging_inner content\"></div></div><div class=\"ui pagination menu userPage fullw\"></div></div><div id=\"center\"><div class=\"ui segment fullw paging_outer\" style=\"height: calc(100% - 4.16rem);\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.group",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"groupFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"groupFilter\" name=\"groupFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist groupList paging_inner content\"></div></div><div class=\"ui groupsel dropdown item\" style=\"display:block;width:14.4rem;\"><div class=\"menu\" style=\"width:100%;\"><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.view_s",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.view_c",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div class=\"ui menu\" style=\"margin-bottom:0.22rem;\"><a class=\"ui groupbtn dropdown item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user'],f=function(event) {ctx.groupSel();};f.call(t, event)})()\"><div class=\"text\"></div><i class=\"dropdown icon\"></i></a></div><div class=\"ui pagination menu groupPage fullw\"></div></div><div id=\"right\" class=\"ui segment\"><div id=\"userCfgLabel\" class=\"ui top attached blue label tov\"></div><div></div><div class=\"grid_c hide\"><form class=\"ui form form_c form-base\" onsubmit=\"event.preventDefault();\"><div class=\"groupCfg\"><div class=\"groupS cfgTop\"><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.cfgG",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><label for=\"groupId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"groupId\" name=\"groupId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"groupName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"groupName\" name=\"groupName\" disabled=\"\"></div><div class=\"form-row\"><label for=\"groupDesc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"groupDesc\" name=\"groupDesc\"></textarea></div></div><div class=\"groupP\"><div style=\"margin:20px 0 20px 0\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.ugperm",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><div class=\"fullw fl-wrap fl-wrap-input upper\"><label class=\"fl-label\" style=\"z-index: 13;\" for=\"groupPerm\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.group_p",{"name":"l","hash":{},"data":data}))
    + "</label><div class=\"ui multiple search selection dropdown activeselect fullw\" style=\"margin-bottom:10px;\"><input type=\"hidden\" name=\"groupPerm\" id=\"groupPerm\" value=\"\" autofocus=\"true\"><i class=\"dropdown icon\"></i><div class=\"default text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.group_p",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"menu\" style=\"overflow-y:auto;max-height:15rem;\"></div></div></div></div></div><div class=\"form-row\"><button class=\"ui right blue button\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.save",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"doclear\"></div></div><div class=\"userS\"><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.cfgU",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><label for=\"userId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"userId\" name=\"userId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"userName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"userName\" name=\"userName\" disabled=\"\"></div><div class=\"form-row\"><label for=\"userLogin\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.login",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"userLogin\" name=\"userLogin\" disabled=\"\"></div><div class=\"form-row\"><label for=\"userPwd\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"login.upwd",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"password\" id=\"userPwd\" name=\"userPwd\" autocomplete=\"new-upassword\"></div><div class=\"form-row\"><label for=\"userMail\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.mail",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"userMail\" name=\"userMail\"></div><div class=\"form-row\"><div class=\"fullw fl-wrap fl-wrap-input upper\"><label class=\"fl-label\" style=\"z-index: 13;\" for=\"userPerm\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.user_p",{"name":"l","hash":{},"data":data}))
    + "</label><div class=\"ui multiple search selection dropdown activeselect fullw\" style=\"margin-bottom:10px;\"><input type=\"hidden\" name=\"userPerm\" id=\"userPerm\" value=\"\" autofocus=\"true\"><i class=\"dropdown icon\"></i><div class=\"default text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.user_p",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"menu\" style=\"overflow-y:auto;max-height:15rem;\"></div></div></div></div><div class=\"form-row\"><div class=\"ui checkbox\"><label for=\"userLock\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.lock",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"checkbox\" id=\"userLock\" name=\"userLock\"></div></div><div class=\"form-row\"><button class=\"ui right blue button\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.save",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"doclear\"></div></div></form></div><div class=\"grid_e\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.nousr",{"name":"l","hash":{},"data":data}))
    + "</div></div></div>";
},"useData":true},"");addA("main/user","user",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
        sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addTmpl("main/user", "topbar",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui edit dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.edit",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.usr",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx[''],f=function(event) {ctx.userAddU();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.add",{"name":"l","hash":{},"data":data}))
    + "\n            </div><div class=\"divider\"></div><div class=\"header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.grp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx[''],f=function(event) {ctx.userAddG();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.add",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div></div><div class=\"ui visibility dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.vis",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vlist\" id=\"vlist\" checked=\"\"><label for=\"vlist\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.list",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vgrp\" id=\"vgrp\"><label for=\"vgrp\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.group",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vopt\" id=\"vopt\" checked=\"\"><label for=\"vopt\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.setting",{"name":"l","hash":{},"data":data}))
    + "</label></div></div></div></div>";
},"useData":true},"");addTmpl("main/user", "modal",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui modal userAdd\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.add",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.add_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"userAddE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"ui grid\" style=\"padding:20px;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.acfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui large form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user_add'],f=function(event) {ctx._user_add(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"add_mail\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.mail",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_mail\" name=\"add_mail\" type=\"email\" class=\"field\" required=\"required\" pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,63}$\"></div><div class=\"form-row\"><div class=\"fullw fl-wrap fl-wrap-input upper\"><label class=\"fl-label\" style=\"z-index: 13;\" for=\"add_perm\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.add_p",{"name":"l","hash":{},"data":data}))
    + "</label><div class=\"ui multiple search selection dropdown activeselect fullw\" style=\"margin-bottom:10px;\"><input type=\"hidden\" name=\"add_perm\" id=\"add_perm\" value=\"\" autofocus=\"true\"><i class=\"dropdown icon\"></i><div class=\"default text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.add_p",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"menu\" style=\"overflow-y:auto;max-height:15rem;\"></div></div></div></div><input type=\"submit\" class=\"submit hide\"></form></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user_add'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div><div class=\"ui modal userAddG\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.addG",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.addG_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"userAddGroupE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"ui grid\" style=\"padding:20px;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"user.agcfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui large form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user_add_group'],f=function(event) {ctx._user_add_group(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"add_name\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_name\" name=\"add_name\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"add_desc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"add_desc\" name=\"add_desc\" class=\"field\" rows=\"5\"></textarea></div><input type=\"submit\" class=\"submit hide\"></form></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user_add_group'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div>";
},"useData":true},"");addA("main/user","user_add_group",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.userAddG', {'style':1, customEvent:autofill});
     });addS("main/user", "_sid17","\n");addJ("main/user","user_add_group",function(ctx, path, sub) { 

    var _canClose = true;
    var _modal = $('.ui.modal.userAddG');
    var name = $('#add_name');
    var _btn = _modal.find('.accept.button');
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                   
    name.on('input', function() {
        if(name.val() == '') {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    });
                   
    sub.onOpen = function(after) {
        submit_err(-1, true);
        sub.after = after;
        label_reset(name);
        _btn.addClass('disabled');
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
        var f = _modal.find('input.submit');
        f.click();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.userAddGroupE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('user.e_existG');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('user.e_addG');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
     this._user_add_group = function(ev, el_frm) {
        if(el_frm.checkValidity()) {
            ev.preventDefault();
        } else {
            return;
        }        
        _canClose = false;
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var n = form_get(el_frm, 'add_name');
        var data = {a:n, b:form_get(el_frm, 'add_desc')};
        
        frm.append('data', '{"cmd":16}');
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                data.n = n;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
 });addA("main/user","user_add",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.userAdd', {'style':1, customEvent:autofill});
     });addS("main/user", "_sid16","\n");addJ("main/user","user_add",function(ctx, path, sub) { 

    var _canClose = true;
    var _modal = $('.ui.modal.userAdd');
    var mail = $('#add_mail');
    var _btn = _modal.find('.accept.button');
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                   
    mail.on('input', function() {
        if(mail.val() == '') {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    });
                   
    sub.onOpen = function(after) {
        submit_err(-1, true);
        sub.after = after;
        sub.resetPerm();
        label_reset(mail);
        _btn.addClass('disabled');
        $('input.search').val('');
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
        var f = _modal.find('input.submit');
        f.click();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.userAddE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('user.e_exist');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('user.e_add');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
     this._user_add = function(ev, el_frm) {
        if(el_frm.checkValidity()) {
            ev.preventDefault();
        } else {
            return;
        }        
        _canClose = false;
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var n = form_get(el_frm, 'add_mail');
        var data = {a:n, l:sub.getPerm()};
        
        frm.append('data', '{"cmd":9}');
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                data.m = 1;
                data.n = n;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
    (function(){
        var d = _modal.find('.ui.dropdown');
        var m = d.find('.menu');
        var u = _modal.find('.upper');
        var _perms = perm_get_all();
        var pn = Object.getOwnPropertyNames(_perms);
        var r = 0;
        
        pn.forEach(function(n) {
            m.append('<div class="item" data="' + n + '">' + polyglot.t('perm.' + n) + '</div>');
        });
         
        sub.getPerm = function() {
            return r;
        };
         
        sub.resetPerm = function() {
            d.dropdown('clear');
            r = 0;
        };
        
        var a = function(v) {
            if(v) {
                u.addClass('fl-is-active');
            } else {
                u.removeClass('fl-is-active');
            }
        }; 
        
        var s = {
            forceSelection:false,
            selectOnKeydown:false,
            clearable:true,
            onAdd:function(addedValue, addedText, $addedChoice) {
                r |= _perms[$addedChoice.attr('data')];
            },
            onRemove:function(removedValue, removedText, $removedChoice) {
                r &= ~_perms[$removedChoice.attr('data')];
                a(!m.hasClass('visible') && r != 0);
            },
            onShow:function() {
                a(false);
            },
            onHide:function() {
                a(true && r != 0);
            }
        };
        
        d.dropdown(s);
    })();
 });addS("main/user", "_sid15","\n#center .ui.menu {\n    min-height:1.857143em;\n    margin: 0;\n    overflow:hidden;\n}\n\n#center .ui.menu .item {\n    padding:0.2rem 1rem 0.2rem 1rem;\n}\n\n#center .menu > .item:before {\n    background-color: #dedede;\n}\n\n#center .groupbtn.dropdown .icon {\n    color: #000;\n}\n\n#center .groupbtn.dropdown:not(.selection):hover .icon,\n#center .groupbtn.dropdown:not(.selection).active .icon {\n    color:#FFF;\n}\n");addJ("main/user","user",function(ctx, path, sub) { 
    var _this = this;
    var sel = null;
    var sel_grp = null;
    var sel_data = null;
    var sel_grp_data = null;
    var sel_name;
    var sel_grp_name;
    
    var cfgLabel = $('#userCfgLabel')[0];
    
    var uFilter = $('#userFilter');
    var gFilter = $('#groupFilter');
    
    var lock = lock_post_init(sub);
    
    function lock_post(url, d, after, rty) {
        sub.lockList();
        post(url, d, function(r, e, s) {
            after(r, e, s);
            sub.unlockList();
        }, rty)
    }
    
    this.userAddU = function() {
        $('.ui.modal.userAdd').modal('show');
        ctx['user_add'].onOpen(function(d) {
            sub.onAddUser(d);
            change.user_edit(d.id, user_name(d), 0);
        });
    };
    
    this.userAddG = function() {
        $('.ui.modal.userAddG').modal('show');
        ctx['user_add_group'].onOpen(function(d) {
            sub.onAddGroup(d);
        });
    };
    
    search_filter('#userFilter', '#left');   
    search_filter('#groupFilter', '#center'); 
    
    $('#topbar .ui.edit.dropdown').dropdown({
       transition: 'fade up',
       context: 'body',
       action:'hide'
    });  
    
    visibility_init(sub, $('#topbar .ui.visibility.dropdown'), function(i) { return sub.pane(i); });
    
    (function(){
        $('#center').css('display', 'none');
        
        var _ctx = {};
        var _sizes = [20, 20, 60];
        var _panes = ['#left', '#center', '#right'];
        
        sub.pane = function(i) {
            return _panes[i];
        }
        
        sub.split = function() {
            doSplit(_panes, _sizes, _ctx, ['#left', '#center']);
        }
        
        sub.split();
    })();
    
    
    (function(){
        var g = $('#right .grid_c');
        var uS = g.find('.userS');
        var m = uS.find('.menu');
        var d = uS.find('.ui.dropdown');
        var u = uS.find('.upper');
        var r = 0;
        var c = function() {};
        
        var _perms = perm_get_all();
        var pn = Object.getOwnPropertyNames(_perms);
        
        pn.forEach(function(n, i) {
            m.append('<div class="item" data-value="' + i + '" data="' + n + '">' + polyglot.t('perm.' + n) + '</div>');
        });
         
        sub.getUPerm = function() {
            return r;
        };
         
        sub.resetUPerm = function() {
            d.dropdown('clear');
            r = 0;
        };
        
        sub.setOnUPerm = function(f) {
            c = f;
        };
        
        var s = {
            forceSelection:false,
            selectOnKeydown:false,
            clearable:true,
            onAdd:function(addedValue, addedText, $addedChoice) {
                r |= _perms[$addedChoice.attr('data')];
                c();
            },
            onRemove:function(removedValue, removedText, $removedChoice) {
                r &= ~_perms[$removedChoice.attr('data')];
                a(!m.hasClass('visible') && r != 0);
                c();
            },
            onShow:function() {
                a(false);
            },
            onHide:function() {
                a(true && r != 0);
            }
        };
        
        var a = function(v) {
            if(v) {
                u.addClass('fl-is-active');
            } else {
                u.removeClass('fl-is-active');
            }
        }; 
         
        sub.setUPerm = function(v) {
            var l = d.parent().find('.fl-label');
            l.css('transition', 'none');
            d.dropdown('clear');
            r = v;
            pn.forEach(function(n, i) {
                if(((1 << i) & v) != 0) {
                    d.dropdown('set selected', '' + i);
                }
            });
            d.dropdown('refresh');
            a(true && r != 0);
            domy.defer(function() {
                l.css('transition', '');
            });
        };
        
        d.dropdown(s);
    })();
    
    (function(){
        var g = $('#right .grid_c');
        var gP = g.find('.groupP');
        var m = gP.find('.menu');
        var d = gP.find('.ui.dropdown');
        var u = gP.find('.upper');
        var r = 0;
        var c = function() {};
        
        var _gperms = gperm_get_all();
        var pn = Object.getOwnPropertyNames(_gperms);
        
        pn.forEach(function(n, i) {
            m.append('<div class="item" data-value="' + i + '" data="' + n + '">' + polyglot.t('perm.' + n) + '</div>');
        });
         
        sub.getGPerm = function() {
            return r;
        };
         
        sub.resetGPerm = function() {
            d.dropdown('clear');
            r = 0;
        };
         
        sub.setOnGPerm = function(f) {
            c = f;
        };
        
        var a = function(v) {
            if(v) {
                u.addClass('fl-is-active');
            } else {
                u.removeClass('fl-is-active');
            }
        }; 
        
        var s = {
            forceSelection:false,
            selectOnKeydown:false,
            clearable:true,
            onAdd:function(addedValue, addedText, $addedChoice) {
                r |= _gperms[$addedChoice.attr('data')];
                c();
            },
            onRemove:function(removedValue, removedText, $removedChoice) {
                r &= ~_gperms[$removedChoice.attr('data')];
                a(!m.hasClass('visible') && r != 0);
                c();
            },
            onShow:function() {
                a(false);
            },
            onHide:function() {
                a(true && r != 0);
            }
        };
        
        sub.setGPerm = function(v) {
            var l = d.parent().find('.fl-label');
            l.css('transition', 'none');
            d.dropdown('clear');
            r = v;
            pn.forEach(function(n, i) {
                if(((1 << i) & v) != 0) {
                    d.dropdown('set selected', '' + i);
                }
            });
            d.dropdown('refresh');
            a(true && r != 0);
            domy.defer(function() {
                l.css('transition', '');
            });
        };
        
        d.dropdown(s);
    })();
    
    (function() {
        var rt = $('#right');
        var g = rt.find('.grid_c');
        var uS = g.find('.userS');
        var gS = g.find('.groupS');
        var gP = g.find('.groupP');
        var gC = g.find('.groupCfg');
        var uB = uS.find('button');
        var gB = gC.find('button');
        
        var uId = uS.find('#userId');
        var uName = uS.find('#userName');
        var uLogin = uS.find('#userLogin');
        var uPwd = uS.find('#userPwd');
        var uMail = uS.find('#userMail');
        var uLock = uS.find('#userLock');
        var gId = gS.find('#groupId');
        var gName = gS.find('#groupName');
        var gDesc = gS.find('#groupDesc');
        
        var loader = loader_init(g);
        var last_sel = null;
        var last_sel_grp = null;
        var lerr = error_init(g, polyglot.t('main.eh_load'), polyglot.t('user.e_load'));
        var serr = error_init(g, polyglot.t('main.eh_save'), polyglot.t('probe.e_csave'));
        
        var uch = false;
        var uwp = false;
        
        var gch = false;
        var gwp = false;
        
        var uoi = function() {
            if(uwp && !uch) {
                uch = true;
                uB.attr('disabled', false);
            }
        };   
        
        var goi = function() {
            if(gwp && !gch) {
                gch = true;
                gB.attr('disabled', false);
            }
        };   
        
        uPwd.on('input', uoi);
        uMail.on('input', uoi);
        uLock.closest('.ui.checkbox').checkbox({
                onChecked:uoi,
                onUnchecked:uoi});
        sub.setOnUPerm(uoi);
        
        gDesc.on('input', goi);
        sub.setOnGPerm(goi);
        
        hide_init(g);
        hide_init(uS);
        hide_init(gS);
        hide_init(gP);
        hide_init(gC);
        
        uB.on('click', function() {
            var d = post_get_val(sel_data,
                                ['m', 'l', 'p'],
                                ['b', 'o', 'n'],
                                [uMail, uLock, sub.getUPerm()]);
            var hp = uPwd.val() != '';
            if(d || hp) { 
                loader.show();
                var c = d ? d.c : function() {};
                d = d ? d.r : null;
                var pd = {data:JSON.stringify({cmd:19})};
                if(hp) {
                    d = d == null ? {} : d;
                    pd.password = uPwd.val();
                }
                d.m = sel;
                var sn = sel_name;
                pd.ext_data = JSON.stringify(d);
                lock.post('/sys/server/', pd, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.hide();
                    if(r.r == 0) {
                        change.user_edit(d.m, sn, 2);
                        c();
                        uch = false;
                        uB.attr('disabled', true);
                    } else {
                        serr.show();
                    }
                });
            }
        });
        
        gB.on('click', function() {
            var d = post_get_val(sel_grp_data,
                                ['d', 'p'],
                                ['b', 'o'],
                                [gDesc, sub.getGPerm()]);
            if(d) {
                var c = d ? d.c : function() {};
                d = d ? d.r : null;
                loader.show();
                var pd = {data:JSON.stringify({cmd:14})};
                d.m = sel_grp;
                if(sel != null && d.o !== undefined) {
                    d.n = sel;
                }
                pd.ext_data = JSON.stringify(d);
                lock.post('/sys/server/', pd, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.hide();
                    if(r.r == 0) {
                        c();
                        gch = false;
                        gB.attr('disabled', true);
                    } else {
                        serr.show();
                    }
                });
            }
        });
        
        function _onChange() {
            var an = {};
            lerr.hide();
            if(sel != null || sel_grp != null) {
                g.show();
                
                do_visible_path(sub, function() { 
                    do_visible_split(rt, function() {
                        var c = 0;
                    
                        if(last_sel != sel && sel != null) {
                            uB.attr('disabled', '');
                            last_sel = sel;
                            uwp = false;
                            uch = false;
                            c++;
                            lock_post('/sys/server/', {data:JSON.stringify({cmd:18}), ext_data:JSON.stringify({id:sel})}, function(d) {
                                var r = d.constructor === String ? JSON.parse(d) : d;
                                if(--c == 0) {
                                    loader.hide();
                                }
                                if(r.r == 0) {
                                    label_set(uId, r.id);
                                    label_set(uName, r.n);
                                    label_set_date(uLogin, r.t);
                                    label_set(uMail, r.m);
                                    label_set(uLock, r.l);
                                    label_set(uPwd, '');
                                    sub.setUPerm(r.p);
                                    uS.show();
                                    sel_data = r;
                                } else {
                                    lerr.show();
                                }
                                uwp = true;
                            });
                        } else if(sel == null) {
                            last_sel = null;
                            uS.hide();
                        }
                        
                        var d = {m:sel_grp};
                        var s = sel;
                        if(s) {
                            d.n = s;
                        }
                        if(last_sel_grp != sel_grp && sel_grp != null) {
                            gB.attr('disabled', '');
                            last_sel_grp = sel_grp;
                            gwp = false;
                            gch = false;
                            c++;
                            lock_post('/sys/server/', {data:JSON.stringify({cmd:13}), ext_data:JSON.stringify(d)}, function(d) {
                                var r = d.constructor === String ? JSON.parse(d) : d;
                                if(--c == 0) {
                                    loader.hide();
                                }
                                if(r.r == 0) {
                                    label_set(gId, r.id);
                                    label_set(gName, r.n);
                                    label_set(gDesc, r.d);
                                    sub.setGPerm(r.p);
                                    gS.show();
                                    gC.show();
                                    if(s) {
                                        gP.show();
                                    } else {
                                        gP.hide();
                                    }
                                    sel_grp_data = r;
                                } else {
                                    lerr.show();
                                }
                                gwp = true;
                            });
                        } else if(sel_grp == null) {
                            last_sel_grp = null;
                            gC.hide();
                        }
                        
                        if(c != 0) {
                            loader.show();
                        }
                        
                    });
                });
            } else {
                g.hide();
            }
            if(sel != null) {
                an.name = sel_name;
            } else {
                an.name = polyglot.t('user.nousr')
            }
            if(sel_grp != null) { 
                an.gname = sel_grp_name;
            }
            var cn = 'user.ucfg';
            if(sel != null && sel_grp != null) {
                cn = 'user.ugcfg';
            } else if(sel_grp != null) {
                cn = 'user.gcfg';
            }
            cfgLabel.innerText = polyglot.t(cn, an);
        }
        
        _this.onChange = function(o, s) {
            if(o !== undefined) {
                sel = o.id;
                sel_name = o.n;
                if(sub.getIdx() == 0) {
                    sub.requestGroups();
                }
            } else {
                sel = null;
                if(sub.getIdx() == 0) {
                    sub.clearGroups();
                }
            }
            if(!s && sub.getIdx() == 1 && sel_grp != null) {
                sub.unselGroup();
            }
            _onChange();
        };
        _this.onChangeGrp = function(o, s) {
            if(o !== undefined) {
                sel_grp = o.id;
                sel_grp_name = o.n;
            } else {
                sel_grp = null;
            }
            if(!s && sub.getIdx() == 1 && sel != null) {
                sub.unselUser();
            }
            _onChange();
        }
    })();
    
    function user_name(v) {
        if(v.m) {
            return polyglot.t('user.noname', {mail:v.n});
        }
        return v.n;
    }
    
    
    (function() {
        var l = $('.userList');
        var p = $('.userPage');
        var n = {page:'main/user',
                 sub:'user',
                 pg:'sub.requestUsers(p)',
                 kd:'sub.requestUsers(parseInt(this.value)-1, event)'
        };
        
        var nl = 0;
        
        var j = list_select(l, function(it) {
            var d = {id:parseInt(it.attr('n')), n:it.attr('nm')};
            if(it.attr('m')) {
                d.m = 1;
            }
            return d;
        }, _this.onChange);
        
        sub.unselUser = function() {
            _this.onChange(undefined, true);
            j();
        };
        
        var m = function(v) {
            return '<div class="item" nm="' + v.n + '" n="' + v.id + '" ' + (v.m ? 'm="1"' : '') + '><div class="content"><span class="text">' + user_name(v) + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.onAddUser = function(d) {
            if(l.find('.item').length == 0) {
                l.html('');
            }
            l.prepend(m(d));
            j(l.children().first());
        }
        
        sub.resetUsers = function() {
            paging_reset(n);
            sub.requestUsers();
        }
        
        var s = list_search(uFilter, sub.resetUsers);
        
        sub.lockUList = function() {
            if(nl == 0) {
                uFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        sub.unlockUList = function() {
            nl--;
            if(nl == 0) {
                uFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        sub.requestUsers = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            _this.onChange();
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    lock_post('/sys/server/', {data:JSON.stringify({cmd:3}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        var rm = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('user.rem', {name:user_name(o)}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('user.e_rem'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock_post('/sys/server/', {data:JSON.stringify({cmd:4}), ext_data:JSON.stringify({a:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        change.user_edit(o.id, user_name(o), 1);
                        it.remove();
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        var rn = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('user.ren', {name:user_name(o)}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="userRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="userRName" name="userRName" class="ui input" value="' + (o.m ? '' : o.n) + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('user.e_csave'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                loader.show();
                var nn = d.val();
                lock_post('/sys/server/', {data:JSON.stringify({cmd:19}), ext_data:JSON.stringify({m:o.id, a:nn})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        change.user_edit(o.id, nn, 2);
                        o.n = nn;
                        delete o.m;
                        it.replaceWith(m(o))
                        serr.remove();
                        sub.unlockList(); 
                        lb.destroy();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        } 
        
        var iv = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('user.invite', {name:user_name(o)}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_invite'), polyglot.t('user.e_rem'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock_post('/sys/server/', {data:JSON.stringify({cmd:10}), ext_data:JSON.stringify({a:o.id,l:login_current().l + 1})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        it.replaceWith(m(o));
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.userList .item', 
            callback:function(key, options) {
                _this.onChange();
                j();
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'invite':
                        iv(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete'},
                'rename':{name:polyglot.t('main.ren'), icon:'edit'},
                'invite':{name:polyglot.t('main.invite'), icon:'invite'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    (function() {
        var ct = $('#center');
        var l = $('.groupList');
        var p = $('.groupPage');
        var n = {page:'main/user',
                 sub:'user',
                 pg:'sub.requestGroups(p)',
                 kd:'sub.requestGroups(parseInt(this.value)-1, event)'
        };
        
        var nl = 0;
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChangeGrp, true);
        
        sub.unselGroup = function() {
            _this.onChangeGrp(undefined, true);
            j();
        };
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.onAddGroup = function(d) {
            if(l.find('.item').length == 0) {
                l.html('');
            }
            l.prepend(m(d));
            j(l.children().first());
        }
        
        sub.clearGroups = function() {
            sub.unselGroup();
            clear_visible_split(ct);
            paging_reset(n);
            p.html('');
            l.html('<div class="list_e">' + polyglot.t('user.nousr') + '</div>');
        }
        
        sub.resetGroups = function() {
            if(sub.getIdx() != 0 || sel != null) {
                paging_reset(n);
                sub.requestGroups();
            } else {
                render({r:0,d:[]});
            }
        }
        
        var s = list_search(uFilter, sub.resetGroups);
        
        sub.lockGList = function() {
            if(nl == 0) {
                uFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        sub.unlockGList = function() {
            nl--;
            if(nl == 0) {
                uFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        sub.requestGroups = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            do_visible_split(ct, function() {
                _this.onChangeGrp(undefined, true);
                paging_render(function(n) {
                    if(n.iv) {
                        var d = s({i:n.i,p:(n.po || 0)*n.i});
                        if(sub.getIdx() == 0) {
                            d.id = sel;
                        }
                        lock_post('/sys/server/', {data:JSON.stringify({cmd:15}), ext_data:JSON.stringify(d)}, function(d) {
                            var r = d.constructor === String ? JSON.parse(d) : d;
                            s();
                            do_visible_path(sub, function() { render(r); });
                        });
                    }
                }, l, p, n, po);
            });
        }
        
        var rm = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            var rnl = polyglot.t('user.remG', {name:o.n});
            if(sub.getIdx() == 0) {
                rnl = polyglot.t('user.remGU', {name:o.n, user:sel_name});
            }
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + rnl + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('user.e_remG'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                var rnb = {m:o.id};
                if(sub.getIdx() == 0) {
                    rnb.n = sel;
                }
                lock_post('/sys/server/', {data:JSON.stringify({cmd:17}), ext_data:JSON.stringify(rnb)}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        it.remove();
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        var gd = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('user.addGU', {name:o.n, user:sel_name}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_add'), polyglot.t('user.e_addGU'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock_post('/sys/server/', {data:JSON.stringify({cmd:16}), ext_data:JSON.stringify({m:o.id, n:sel})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    it.replaceWith(m(o));
                    if(r.r == 0) {
                        serr.remove();
                        sub.unlockList();
                    } else {
                        serr.show();
                    }
                });
            };
        }
        
        var rn = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user'),sub=ctx['user'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('user.renG', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="groupRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="groupRName" name="groupRName" class="ui input" value="' + o.n + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('user.e_csaveG'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                loader.show();
                var nn = d.val();
                lock_post('/sys/server/', {data:JSON.stringify({cmd:14}), ext_data:JSON.stringify({m:o.id, a:nn})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        o.n = nn;
                        it.replaceWith(m(o))
                        serr.remove();
                        sub.unlockList(); 
                        lb.destroy();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
    
        function disabled(key, opt) {
            return sub.getIdx() == 0 ? (key == 'add_to_group') : (key == 'add_to_group' && sel == null);
        }
    
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.groupList .item', 
            callback:function(key, options) {
                _this.onChangeGrp(undefined, true);
                j();
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'add_to_group':
                        gd(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete', disabled:disabled},
                'rename':{name:polyglot.t('main.ren'), icon:'edit', disabled:disabled},
                'add_to_group':{name:polyglot.t('main.add'), icon:'add', disabled:disabled}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    (function(){
        var bn;
        var c = $('#center .ui.groupsel.dropdown');
        var b = $('#center .ui.groupbtn.dropdown');
        var r = $('#center');
        var idx = -1;
        c.dropdown({
           transition: 'fade up',
           context: 'body',
           onChange: function(value, text, $choice) {
                idx = $(c[0].firstChild).children().index($choice[0]);
                b.children().first().text(polyglot.t('user.view_p') + text);
                bn = {name:'', src:text.toLowerCase() + '.html'};
                sub.resetGroups();
           }
        });
        
        sub.getIdx = function() {
            return idx;
        }
    
        _this.groupSel = function() {
            c.css('width', b.outerWidth(true) + 'px');
            c.click();
        };
        
        c.dropdown('set selected', polyglot.t('user.view_s'));
    })();
    
    
    sub.lockList = function() {
        sub.lockUList();
        sub.lockGList();
    };
    
    sub.unlockList = function() {
        sub.unlockUList();  
        sub.unlockGList();  
    };
    
    sub.requestUsers();

 });addTmpl("main/user_chat", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sgrid\"><div id=\"left\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.chat",{"name":"l","hash":{},"data":data}))
    + "\n                </div></div><div></div><div class=\"content txt paging_inner\"></div></div><div class=\"ui input cinput\"><input type=\"text\" placeholder=\""
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.msg",{"name":"l","hash":{},"data":data}))
    + "\" disabled=\"\"></div><button class=\"ui blue button cbutton\" disabled=\"\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.send",{"name":"l","hash":{},"data":data}))
    + "</button></div><div id=\"center\"><div class=\"ui segment paging_outer\" style=\"height: calc(100% - 2.08rem);\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov chatLabel\" style=\"float:left;width:calc(100% - 30px)\"></div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"chatFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"chatFilter\" name=\"chatFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist paging_inner chatList content\"></div></div><div class=\"ui segment lsegment\"></div><div class=\"ui blue button lbutton\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.creat",{"name":"l","hash":{},"data":data}))
    + "</div></div><div id=\"right\" class=\"ui segment\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.invnj",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div><div></div><div class=\"content grid_c\"><form class=\"ui form form_c form-base\" onsubmit=\"event.preventDefault();\"><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.setting",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><div class=\"ui checkbox\"><label for=\"inviteIgnore\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.igninv",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"checkbox\" id=\"inviteIgnore\" name=\"inviteIgnore\"></div></div><div class=\"form-row\"><div class=\"ui checkbox\"><label for=\"joinIgnore\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.ignjn",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"checkbox\" id=\"joinIgnore\" name=\"joinIgnore\"></div></div><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.invite",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><label for=\"inviteName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"inviteName\" name=\"inviteName\" disabled=\"\"></div><div class=\"form-row\"><button class=\"ui right blue button invite\" disabled=\"\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.send",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.join",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><label for=\"joinName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"joinName\" name=\"joinName\"></div><div class=\"form-row\"><button class=\"ui right blue button join\" disabled=\"\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.send",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"doclear\"></div></form></div></div></div>";
},"useData":true},"");addA("main/user_chat","user_chat",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
        sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addTmpl("main/user_chat", "topbar",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui visibility dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.vis",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vlist\" id=\"vchat\" checked=\"\"><label for=\"vchat\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.chat",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vsett\" id=\"vuser\" checked=\"\"><label for=\"vuser\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.usrs",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vinvite\" id=\"vsett\"><label for=\"vinvite\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"chat.invnj",{"name":"l","hash":{},"data":data}))
    + "</label></div></div></div></div>";
},"useData":true},"");addS("main/user_chat", "_sid14","\n\n.ui.input.cinput {\n    margin:0;\n    padding:0;\n    height:1.8rem;\n    width:calc(100% - 10rem);\n    float:left;\n}\n\n.ui.segment.lsegment,\n.ui.button.lbutton,\n.ui.button.cbutton {\n    margin:0;\n    padding:0;\n    height:1.8rem;\n    line-height: 1.8rem;\n    width:9.7rem;\n    float:right;\n}\n\n.ui.button.lbutton {\n    float:left;\n}\n\n.ui.segment.lsegment {\n    width:calc(100% - 10rem);\n}\n\n#left .txt > div {    \n    padding: 0.2rem;\n    border-bottom: 1px solid #dedede;\n}\n\n#left .txt .me {\n    color:#9e9e9e;\n}\n\n#left .txt .invite,\n#left .txt .info {\n    color:#23a742;\n}\n\n#left .txt .error {\n    color:#FF0000;\n}\n\n#left .txt .invite {\n    cursor:pointer;\n}\n\n#left .txt pre {\n    display:inline-block;\n    margin:0;\n}\n\n#left .date {\n    color:#607d8b;   \n    margin-right: 10px;\n}\n\n#left .name {\n    color:#A56742;\n    margin-right: 10px;\n}\n\n#center .item.invited {\n    color:#9e9e9e;\n}\n\n#center .item.admin {\n    color:#f2711c;\n}\n\n#center .item.admin.active,\n#center .item.invited.active,\n#center .item.admin:hover,\n#center .item.invited:hover {\n    color:#FFF;\n}\n\n");addJ("main/user_chat","user_chat",function(ctx, path, sub) { 
    var uFilter = search_filter('#chatFilter', '#center');
    var uDir = uFilter.parent().find('.toggl');   
    var cBtn = $('#center .button');   
    var sBtn = $('#left .button');
    var iBtn = $('#right .invite.button');
    var jBtn = $('#right .join.button');
    var ign = $('#inviteIgnore');
    var jign = $('#joinIgnore');
    var iName = $('#inviteName');
    var jName = $('#joinName');
    var lbl = $('#center .chatLabel');
    var msg = $('#left input');
    var txt = $('#left .txt');
    var chat_owner = "";
    var users = []; // sort idx to userId
    var users_data = {}
    var renderLock = false;
    var needRender = false;
    var admin = false;
    txt.attr('snapScroll', '1');
    
    lbl.text(polyglot.t('chat.usrs'));
    
    $(document).keydown(function() {
        do_visible_path(sub, function() {
            var a = document.activeElement;
            if(a != iName[0] && a != jName[0] && a != uFilter[0]) {
                msg.focus(); 
            }
        });
    });
    
    (function(){
        var l = $('#center .chatList');
        var chatId = 0;
        var c = false;
        var iInv = false;
        var iJn = false;
        var s = false;
        
        sub.wsock_open = function() {
            connected(false);
        };
        
        $(document).on('wsock_open', sub.wsock_open);
        
        function ignoreInv(v) {
            iInv = v;
        }
        
        function ignoreJn(v) {
            iJn = v;
        }
    
        ign.closest('.ui.checkbox').checkbox({
                onChecked:function() { ignoreInv(true); },
                onUnchecked:function() { ignoreInv(false); }});
                
        jign.closest('.ui.checkbox').checkbox({
                onChecked:function() { ignoreJn(true); },
                onUnchecked:function() { ignoreJn(false); }});
                
        function connected(v) {
            c = v;
            if(s != v) {
                s = v;
                if(v) {
                    addCon();
                } else {
                    addDisc();
                }
            }
            var d = !v;
            cBtn.text(polyglot.t(d ? 'main.creat' : 'main.disc'));
            sBtn.attr('disabled', msg.val() == '' || d);
            iBtn.attr('disabled', iName.val() == '' || d);
            jBtn.attr('disabled', jName.val() == '' || c);
            jName.attr('disabled', c);
            iName.attr('disabled', d);
            msg.attr('disabled', d);
            if(d) {
                admin = false;
                reset();
            }
        }
        
        sub.join = function(id, nm) {
            client_socket(function(s) {
                var o = {
                    onResult:function(d) {
                        txt.text('');
                        chatId = id;
                        connected(true);
                        change.chat_inv(nm, 1);
                    },
                    onError:function(d) {
                        addError(polyglot.t('chat.e_join'));
                    },
                    p:{s:s}
                };;
                var d = {t:22, x:id, data:''};
                if(request(d, o)) {
                }
            });
        };
        
        sub.scrollfix = function() {
            txt.scrollTop(txt[0].scrollHeight);
        };
        
        function clean(ns) {
            var n = txt.children().length;
            while(n >= 9999) {
                n--;
                $(txt[0].firstChild).remove();
            }

            if(ns) {
                sub.scrollfix();
            }
        }
        
        function addCon() {
            var d = new Date();    
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            txt.append('<div class="info"><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.con') + '</span></div>');
            clean(ns);
        }
        
        function addDisc() {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            txt.append('<div class="info"><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.disc') + '</span></div>');
            clean(ns);
        }
        
        function addInvited(n) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            txt.append('<div class="info"><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.invd', {name:n}) + '</span></div>');
            clean(ns);
        }
        
        function addJoinRequested(n) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            txt.append('<div class="info"><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.joind', {name:n}) + '</span></div>');
            clean(ns);
        }
        
        function addError(v) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            txt.append('<div class="error"><span class="date">' + date_format(d) + '</span><span>' + v + '</span></div>');
            clean(ns);
        }
        
        sub.addError = addError;
        
        function addLeft(n) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            txt.append('<div class="info"><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.left', {name:n.n}) + '</span></div>');
            clean(ns);
        }
        
        function addJoin(n) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            txt.append('<div class="info"><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.join', {name:n.n}) + '</span></div>');
            clean(ns);
        }
        
        function addJoinRequest(n) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user_chat'),sub=ctx['user_chat'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            txt.append('<div class="invite" onclick=' + cl('sub.invite(\'' + n.n + '\');') + '><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.joinr', {name:n.n}) + '</span></div>');
            clean(ns);
        }
        
        function addInvite(n) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user_chat'),sub=ctx['user_chat'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            txt.append('<div class="invite" onclick=' + cl('sub.join(' + n.d + ',' + n.s + ');') + '><span class="date">' + date_format(d) + '</span><span>' + polyglot.t('chat.invr', {name:n.s}) + '</span></div>');
            clean(ns);
        }
        
        function addMsg(n, o) {
            var d = new Date();
            var ns = txt[0].scrollHeight - txt[0].offsetHeight - txt[0].scrollTop < 1;
            var u = users_data[n.s];
            if(!o && !u) {
                return;
            }
            
            var p = '';
            if(n.p) {
                p = ' (' + polyglot.t('chat.priv') + ') ';
            }
            
            txt.append('<div ' + (o ? 'class="me"' : '') + '><span class="date">' + date_format(d) + '</span>' + p + (n.p && o ? polyglot.t('chat.to', {name:u.n}) + ': ' : '') + (o ? '' : '<span class="name">' + u.n + ':</span>') + '<pre>' + n.d + '</pre>' + '</div>');
            clean(ns);
        }
        
        function filter() {
            var f = uFilter.val();
            var d = uDir.hasClass('up') ? 1 : 0;
            var r = f != '' ? users.filter(function(n) {
               return users_data[n].n.indexOf(f) != -1; 
            }) : users;
            
            r.sort(function(a, b) {
                var n = users_data[a].n.localeCompare(users_data[b].n);
                return d == 1 ? n : -n; 
            }); 
            
            return r;
        }
        
        function addUser(u) {
            var idx = users.indexOf(u.i);
            if(idx != -1) {
                users.splice(idx, 1);
                delete users_data[u.i];
            }
            users.push(u.i);
            users_data[u.i] = u; 
            render();
        }
        
        function removeUser(u) {
            var idx = users.indexOf(u.i);
            if(idx != -1) {
                users.splice(idx, 1);
                delete users_data[u.i];
                render();
                return true;
            }
            return false;
        }
        
        sub.renderItem = function(n) {
            var u = users_data[n];
            return u ? '<div n="' + n + '" class="item' + (u.v ? ' invited' : '') + (u.a ? ' admin' : '') + '" data="' + u.i + '"><span class="text">' + u.n + '</span></div>' : null;
        };
        
        function render() {
            if(renderLock) {
                needRender = true;
                return;
            }
            sub.resetSel();
            var f = $(document.createDocumentFragment());
            filter().forEach(function(n) {
                f.append(sub.renderItem(n));
            });
            l.html('');
            l.append(f);
        }
        
        sub.render = render;
        
        function reset() {
            users = [];
            users_data = {};
            render();
        }
        
        sub.onChat = function(e, n) {
            switch(n.m) {
                case 1: // user left
                    if(n.a) {
                        var u = users_data[n.a];
                        if(u) {
                            u.a = true;
                        }
                    }
                    if(n.cn) {
                        chat_owner = n.cn;
                        lbl.text(polyglot.t('chat.usrsn', {name:chat_owner}));
                    }
                    var d = users_data[n.d];
                    if(d === undefined) {
                        var lin = login_current();
                        if(lin.id == n.d) {
                            connected(false);
                        }
                    }
                    if(d && removeUser(d)) {
                        addLeft(d);
                    }
                    chatId = n.c;
                    break;
                case 2: // admin change
                    var u = users_data[n.d];
                    if(u) {
                        u.a = n.a == 1;
                    }
                    var lin = login_current();
                    if(n.d == lin.id) {
                        admin = n.a == 1;
                    }
                    render();
                    break;
                case 3: // invitation
                    if(!iInv) {
                        addInvite(n);
                    }
                    break;
                case 4: // message
                    addMsg(n);
                    break;
                case 5: // user joined
                    var d = {i:n.d,n:n.n};
                    addJoin(d);
                    addUser(d);
                    break;
                case 6: // user list
                    chat_owner = n.cn;
                    lbl.text(polyglot.t('chat.usrsn', {name:chat_owner}));
                    users = [];
                    users_data = {};
                    n.d.forEach(function(n) {
                        users.push(n.i);
                        users_data[n.i] = n;
                    });
                    render();
                    break;
                case 7: // join request
                    if(!iJn) {
                        var d = {i:n.d,n:n.s};
                        addJoinRequest(d);
                    }
                    break;
            }
        };
        
        $(document).on('onChat', sub.onChat);
        
        cBtn.on('click', function() {
            cBtn.attr('disabled', true);
            iBtn.attr('disabled', true);
            msg.attr('disabled', true);
            iName.attr('disabled', true);
            reset();
            client_socket(function(s) {
                var o = {
                    onResult:function(d) {
                        var lin = login_current();
                        chatId = c ? 0 : lin.id;
                        connected(!c);
                        if(c) {
                            admin = true;
                            chat_owner = login_get_name();
                            lbl.text(polyglot.t('chat.usrsn', {name:chat_owner}));
                        } else {
                            chat_owner = ''
                            lbl.text(polyglot.t('chat.usrs'));
                        }
                    },
                    onError:function(d) {
                        connected(false);
                        addError(polyglot.t('chat.e_con'));
                    },
                    p:{s:s}
                };;
                var d = {t:(c ? 23 : 20), data:''};
                if(request(d, o)) {
                }
            });
        });
    
        var ins = false;
        sub.sendMsg = function() {
            var m = msg.val();
            var sl = sub.getSel();
            if(ins || m == '') {
                return;
            }
            ins = true;
            client_socket(function(s) {
                var o = {
                    onResult:function(d) {
                        var md = {d:m};
                        if(sl != null) {
                            md.p = 1;
                            md.s = sl;
                        }
                        addMsg(md, true);
                        msg.val('');
                        msg.attr('disabled', false);
                        msg.focus();
                        ins = false;
                    },
                    onError:function(d) {
                        sBtn.attr('disabled', false);
                        msg.attr('disabled', false);
                        msg.focus();
                        ins = false;
                        addError(polyglot.t('chat.e_msg'));
                    },
                    p:{s:s}
                };
                var d = {t:24, x:chatId};
                if(sl != null) {
                    d.y = sl;
                }
                if(request(d, o, m)) {
                    sBtn.attr('disabled', true);
                    msg.attr('disabled', true);
                }
            });
        };
    
        sBtn.on('click', sub.sendMsg);
        
        sub.invite = function(n, onBegin, onOk, onErr) {
            client_socket(function(s) {
                var o = {
                    onResult:function(d) {
                        if(onOk) {
                            onOk();
                        }
                        addInvited(n);
                        addUser({i:d.d,n:n,a:false,v:true});
                        change.chat_inv(n, 0);
                    },
                    onError:function(d) {
                        addError(polyglot.t('chat.e_invite'));
                        if(onErr) {
                            onErr();
                        }
                    },
                    p:{s:s}
                };;
                var d = {t:21, x:chatId, data:n};
                if(request(d, o)) {
                    if(onBegin) {
                        onBegin();
                    }
                }
            });
        }
        
        var in_inv = false;
        sub.do_invite = function() {
            if(in_inv) {
                return false;
            }
            in_inv = true;
            sub.invite(iName.val(), function() {
                iBtn.attr('disabled', true);
            }, function() {
                iName.val('');
                in_inv = false;
            }, function() {
                in_inv = false;
                iBtn.attr('disabled', false);
            })
        }
    
        iBtn.on('click', sub.do_invite);
        
        var in_join = false
        sub.do_join = function() {
            if(in_join) {
                return false;
            }
            in_join = true;
            var n = jName.val();
            client_socket(function(s) {
                var o = {
                    onResult:function(d) {
                        jName.val('')
                        addJoinRequested(n);
                        in_join = false;
                    },
                    onError:function(d) {
                        jBtn.attr('disabled', false);
                        addError(polyglot.t('chat.e_joinr'));
                        in_join = false;
                    },
                    p:{s:s}
                };;
                var d = {t:26, data:n};
                if(request(d, o)) {
                    jBtn.attr('disabled', true);
                }
            });
        };
        
        jBtn.on('click', sub.do_join);
    })();
    
    msg.on('input', function() {
        sBtn.attr('disabled', msg.val() == '');
    });
    
    msg.on('keydown', function(e) {
        if(e.keyCode == 13) {
            sub.sendMsg();
        }
    });
    
    iName.on('input', function() {
        iBtn.attr('disabled', iName.val() == '');
    });
    
    iName.on('keydown', function(e) {
        if(e.keyCode == 13) {
            sub.do_invite();
        }
    });
    
    jName.on('input', function() {
        jBtn.attr('disabled', jName.val() == '');
    });
    
    jName.on('keydown', function(e) {
        if(e.keyCode == 13) {
            sub.do_join();
        }
    });

    visibility_init(sub, $('#topbar .ui.visibility.dropdown'), function(i) { return sub.pane(i); });
    
    (function(){
        $('#right').css('display', 'none');
        
        var _ctx = {};
        var _sizes = [60, 20, 20];
        var _minSize = [250, 250, 250];
        var _panes = ['#left', '#center', '#right'];
        
        sub.pane = function(i) {
            return _panes[i];
        }
        
        sub.split = function() {
            doSplit(_panes, {sizes:_sizes,minSize:_minSize}, _ctx, ['#center', '#right']);
        }
        
        sub.split();
    })();
    
    (function() {
        var sel = null;
        var l = $('.chatList');
        var _this = this; 
        var nl = 0;
        
        function filter() {
            sub.render();
        }
        
        sub.getSel = function() {
            return sel;
        }
        sub.resetSel = function() {
            sel = null;
        }
        
        _this.onChange = function(n) {
            if(n === undefined || sel == n.id) {
                sel = null;
            } else {
                sel = n.id;
            } 
        };
        
        var s = list_search(uFilter, filter);
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChange, true);
                
        sub.lockList = function() {
            if(nl == 0) {
                renderLock = true;
                uFilter.attr('disabled', '');
                l.addClass('nomouse_i');
            }
            nl++;
        }
        
        sub.unlockList = function() {
            nl--;
            if(nl == 0) {
                renderLock = false;
                uFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                if(needRender) {
                    needRender = false;
                    sub.render();
                    return false;
                }
            }
            return true;
        }
        
        var disabled = function() {
            return !admin;
        };
        
        var rm = function(o, it) {
            sub.lockList();
            var id = o.id;
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user_chat'),sub=ctx['user_chat'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('chat.u_drop', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                var r = sub.renderItem(id);
                if(r) {
                    it = it.replaceFrom(r, 'active');
                    j.reset(it);
                } else {
                    it.remove();
                }
                sub.unlockList();
            };
            
            sub.submit = function() {
                client_socket(function(s) {
                    var o = {
                        onResult:function(d) {
                            if(sub.unlockList()) {
                                sub.render();
                            }
                        },
                        onError:function(d) {
                            sub.abort();
                            sub.addError(polyglot.t('chat.e_drop'));
                        },
                        p:{s:s}
                    };
                    var d = {t:25, x:id, y:2, data:''};
                    if(request(d, o)) {
                    }
                });
            };
        }
        
        var up = function(o, it, a) {
            sub.lockList();
            var id = o.id;
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/user_chat'),sub=ctx['user_chat'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t(a ? 'chat.u_adm_r' : 'chat.u_adm_a', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                var r = sub.renderItem(id);
                if(r) {
                    it = it.replaceFrom(r, 'active');
                    j.reset(it);
                } else {
                    it.remove();
                }
                sub.unlockList();
            };
            
            sub.submit = function() {
                client_socket(function(s) {
                    var o = {
                        onResult:function(d) {
                            if(sub.unlockList()) {
                                sub.render();
                            }
                        },
                        onError:function(d) {
                            sub.abort();
                            sub.addError(polyglot.t('chat.e_admin'));
                        },
                        p:{s:s}
                    };
                    var d = {t:25, x:id, y:(a ? 0 : 1), data:''};
                    if(request(d, o)) {
                    }
                });
            };
        }
        
        $.contextMenu({
            zIndex: 103,
            selector:'.chatList .item', 
            className:'chatListC',
            callback:function(key, options) {
                _this.onChange();
                j();
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'admin':
                        up(this.o, this.it, this.v);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('chat.drop'), icon:'delete', disabled:disabled},
                'admin':{name:'', icon:'edit', disabled:disabled}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    this.v = it.hasClass('admin');
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    this.v = null;
                    j.reset();
                }
            }
        });
        
        l.on('contextmenu', function(e){
            var it = $(e.target).closest('.item');
            var c = $('.context-menu-list.context-menu-root.chatListC')[0].childNodes;
            $(c[1]).find('span').text(polyglot.t(it.hasClass('admin') ? 'chat.adm_r' : 'chat.adm_a'));
        }); 
    })();    
    
    $.event.trigger({
    	type: "chatReady"
    });
    
    $(document).one('cacheDestroy', function() {
        $(document).off('wsock_open', sub.wsock_open);
        $(document).off('onChat', sub.onChat);
    });
 });addTmpl("main/module", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sgrid\"><div id=\"left\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.list",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"moduleFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"moduleFilter\" name=\"moduleFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist moduleList paging_inner content\"></div></div><div class=\"ui pagination menu modulePage fullw\"></div></div><div id=\"cfg\" class=\"ui segment\"><div id=\"moduleCfgLabel\" class=\"ui top attached blue label tov\"></div><div></div><div class=\"grid_c hide\"><form class=\"ui form form_c form-base\" onsubmit=\"event.preventDefault();\"><div class=\"moduleInst cfgTop\"><div class=\"ui header moduleInstLbl\"></div><div class=\"form-row\"><label for=\"moduleIId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"moduleIId\" name=\"moduleIId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"moduleIName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"moduleIName\" name=\"moduleIName\" disabled=\"\"></div></div><div><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.cfg",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><label for=\"moduleId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"moduleId\" name=\"moduleId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"moduleName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"moduleName\" name=\"moduleName\" disabled=\"\"></div><div class=\"form-row\"><label for=\"moduleDesc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"moduleDesc\" name=\"moduleDesc\"></textarea></div><div class=\"form-row\"><label for=\"moduleUID\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.uid",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"moduleUID\" name=\"moduleUID\"></div><div class=\"form-row\"><label for=\"moduleGID\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.gid",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"moduleGID\" name=\"moduleGID\"></div><div class=\"form-row\"><div class=\"ui checkbox\"><label for=\"moduleLock\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.lock",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"checkbox\" id=\"moduleLock\" name=\"moduleLock\"></div></div><div class=\"form-row\"><button class=\"ui right blue button\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.save",{"name":"l","hash":{},"data":data}))
    + "</button></div></div></form></div><div class=\"grid_e\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.nomodule",{"name":"l","hash":{},"data":data}))
    + "</div></div><div id=\"center\"><div id=\"center_top\"><div class=\"ui segment moduleICtx\" style=\"height:100%;padding:0;\"><div id=\"moduleLabel\" class=\"ui top attached blue label tov\"></div><div></div><div class=\"grid_c hide\"><div class=\"content\"></div></div><div class=\"grid_e\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.noinst",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div id=\"center_middle\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                        "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.inst",{"name":"l","hash":{},"data":data}))
    + "\n                    </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"moduleIFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"moduleIFilter\" name=\"moduleIFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist moduleIList paging_inner content\"></div></div><div class=\"ui pagination menu moduleIPage fullw\"></div></div><div id=\"center_bottom\"><div class=\"ui segment\" style=\"height:100%;padding:0;\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                        "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.log",{"name":"l","hash":{},"data":data}))
    + "\n                    </div><div class=\"dropdown\" style=\"display:inline-block;float:right;widh:20px;\"><i id=\"mlogClear\" class=\"ui icon close\" style=\"cursor:pointer;\"></i></div></div><div class=\"content grid_c\" style=\"padding:5px;\"><pre id=\"mlogTxt\" style=\"display:block;height:100%;margin:0;\"></pre></div></div></div></div><div id=\"right\" class=\"MODULE_SOURCE\"><div class=\"ui segment fullw paging_outer\"><div id=\"moduleSrcLabel\" class=\"ui top attached blue label tov\"></div><div id=\"editor\" class=\"hide grid_c editor\"></div><div class=\"grid_e moudleSrcError\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.nofile",{"name":"l","hash":{},"data":data}))
    + "</div></div><div class=\"ui modulesel dropdown item\" style=\"display:block;\"><div class=\"menu\" style=\"width:100%;\"><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.view_s",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.view_c",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.view_r",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.view_bh",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.view_bc",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.view_uh",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.view_uc",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div class=\"ui menu\" style=\"position:relative;\"><a class=\"ui item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) {ctx.moduleSave();};f.call(t, event)})()\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.save",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"ui modulebtn dropdown item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) {ctx.moduleSel();};f.call(t, event)})()\"><div class=\"text\"></div><i class=\"dropdown icon\"></i></a></div></div><div id=\"uses\" class=\"USER_EDIT\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.uses",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"usesFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"usesFilter\" name=\"usesFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled list plist usesList paging_inner content\"></div></div><div class=\"ui pagination menu usesPage fullw\"></div></div></div>";
},"useData":true},"");addA("main/module","module",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addTmpl("main/module", "topbar",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui edit dropdown item MODULE_ADD\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.edit",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.module",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx[''],f=function(event) {ctx.moduleAdd();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.add",{"name":"l","hash":{},"data":data}))
    + "\n            </div><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx[''],f=function(event) {ctx.moduleUpld();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.upload",{"name":"l","hash":{},"data":data}))
    + "\n            </div><div class=\"item disabled\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx[''],f=function(event) {ctx.moduleInst();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.install",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div></div><div class=\"ui visibility dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.vis",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vlist\" id=\"vlist\" checked=\"\"><label for=\"vlist\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.list",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vcfg\" id=\"vcfg\"><label for=\"vcfg\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.cfg",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vinst\" id=\"vinst\" checked=\"\"><label for=\"vinst\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.inst",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vsetup\" id=\"vsetup\" checked=\"\"><label for=\"vsetup\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.setup",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item MODULE_SOURCE\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vsrc\" id=\"vsrc\"><label for=\"vsrc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.source",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item USER_EDIT\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vuses\" id=\"vuses\"><label for=\"vuses\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.uses",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vlog\" id=\"vlog\"><label for=\"vlog\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.log",{"name":"l","hash":{},"data":data}))
    + "</label></div></div></div></div>";
},"useData":true},"");addTmpl("main/module", "modal",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui modal moduleAdd\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.add",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.add_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"moduleAddE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"divide\" style=\"left:57.5%;bottom: -25px;\"></div><div class=\"ui grid\" style=\"padding:20px;\"><div style=\"width:calc(60% - 2rem);margin:0;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.acfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module_add'],f=function(event) {ctx._module_add(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"add_name\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_name\" name=\"add_name\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"add_iname\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.iname",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_iname\" name=\"add_iname\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"add_desc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"add_desc\" name=\"add_desc\" rows=\"5\"></textarea></div><div class=\"form-row\"><div class=\"ui checkbox\"><input id=\"add_lock\" name=\"add_lock\" type=\"checkbox\" tabindex=\"0\" class=\"hidden\"><label for=\"add_lock\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.lock",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><input type=\"submit\" class=\"submit hide\"></form></div></div></div><div style=\"width:40%;margin:0 0 0 2rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.agrp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"fullw\" style=\"height:calc(100% - 2rem);\"><div><div class=\"ui icon input tinput fl-wrap fullw\"><i class=\"angle up link toggl icon\"></i><label for=\"addFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"addFilter\" name=\"addFilter\" class=\"prompt fullw\" type=\"text\"><i class=\"search link icon\"></i></div></div><div class=\"ui segment fullw tlist\" style=\"height:calc(100% - 5rem);\"><div class=\"ui middle aligned celled selection list moduleGroupList mlist fullw fullh\"></div></div><div class=\"ui pagination menu moduleGroupPage fullw\"></div></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module_add'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div><div class=\"ui modal moduleUpld\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.upld",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.upld_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"moduleUpldE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"divide\" style=\"left:57.5%;bottom: -25px;\"></div><div class=\"ui grid\" style=\"padding:20px;\"><div style=\"width:calc(60% - 2rem);margin:0;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.acfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module_upload'],f=function(event) {ctx._module_upload(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"upld_name\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"upld_name\" name=\"upld_name\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><div class=\"fl-wrap fl-wrap-input fl-is-required\"><label for=\"ubox\" class=\"fl-label\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.dropp",{"name":"l","hash":{},"data":data}))
    + "</label><div id=\"ubox\" class=\"empty fl-input\">\n                                            "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.dropp",{"name":"l","hash":{},"data":data}))
    + "\n                                        </div></div><input type=\"file\" style=\"display: none\"></div><div class=\"form-row\"><label for=\"upld_desc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"upld_desc\" name=\"upld_desc\" rows=\"5\"></textarea></div><div class=\"form-row\"><div class=\"ui checkbox\"><input id=\"upld_lock\" name=\"upld_lock\" type=\"checkbox\" tabindex=\"0\" class=\"hidden\"><label for=\"upld_lock\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.lock",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><input type=\"submit\" class=\"submit hide\"></form></div></div></div><div style=\"width:40%;margin:0 0 0 2rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.agrp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"fullw\" style=\"height:calc(100% - 2rem);\"><div><div class=\"ui icon input tinput fl-wrap fullw\"><i class=\"angle up link toggl icon\"></i><label for=\"upldFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"upldFilter\" name=\"upldFilter\" class=\"prompt fullw\" type=\"text\"><i class=\"search link icon\"></i></div></div><div class=\"ui segment fullw tlist\" style=\"height:calc(100% - 5rem);\"><div class=\"ui middle aligned celled selection list uploadGroupList mlist fullw fullh\"></div></div><div class=\"ui pagination menu uploadGroupPage fullw\"></div></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module_upload'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div><div class=\"ui modal moduleInst\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.inst",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.inst_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"moduleInstE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"divide\" style=\"left:57.5%;bottom: -25px;\"></div><div class=\"ui grid\" style=\"padding:20px;\"><div style=\"width:calc(60% - 2rem);margin:0;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.acfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module_install'],f=function(event) {ctx._module_install(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"inst_name\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"inst_name\" name=\"inst_name\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"inst_iname\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"module.iname",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"inst_iname\" name=\"inst_iname\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"inst_desc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"inst_desc\" name=\"inst_desc\" rows=\"5\"></textarea></div><div class=\"form-row\"><div class=\"ui checkbox\"><input id=\"inst_lock\" name=\"inst_lock\" type=\"checkbox\" tabindex=\"0\" class=\"hidden\"><label for=\"inst_lock\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.lock",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><input type=\"submit\" class=\"submit hide\"></form></div></div></div><div style=\"width:40%;margin:0 0 0 2rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.agrp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"fullw\" style=\"height:calc(100% - 2rem);\"><div><div class=\"ui icon input tinput fl-wrap fullw\"><i class=\"angle up link toggl icon\"></i><label for=\"instFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"instFilter\" name=\"instFilter\" class=\"prompt fullw\" type=\"text\"><i class=\"search link icon\"></i></div></div><div class=\"ui segment fullw tlist\" style=\"height:calc(100% - 5rem);\"><div class=\"ui middle aligned celled selection list installGroupList mlist fullw fullh\"></div></div><div class=\"ui pagination menu installGroupPage fullw\"></div></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module_install'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div>";
},"useData":true},"");addA("main/module","module_install",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.moduleInst', {'style':1, customEvent:autofill});
     });addS("main/module", "_sid13","\n");addJ("main/module","module_install",function(ctx, path, sub) { 
    var _this = this;
    var _canClose = true;
    var _modal = $('.ui.modal.moduleInst');
    var _btn = _modal.find('.accept.button');
    var sel = null;
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                    
    $('#inst_name').on('input', onChange);
                  
    function onChange() {
        var v = $('#inst_name').val();
        var v1 = $('#inst_iname').val();
        if(v === '' || v1 === '') {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    } 
                   
    sub.onOpen = function(after) {
        sub.after = after;
        submit_err(-1, true);
        var n = $('#inst_name');
        label_reset(n);
        $('#instFilter')[0].reset();
        label_reset($('#inst_desc'));
        label_reset($('#inst_iname'));
        $('#inst_lock').prop('checked', false);
        sub.resetGroups();
        n.focus();
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
        var f = _modal.find('input.submit');
        f.click();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.moduleInstE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('module.e_exist');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('module.e_inst');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
    this._module_install = function(ev, el_frm) {
        if(el_frm.checkValidity()) {
            ev.preventDefault();
        } else {
            return;
        }        
        _canClose = false;
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var data = {n:form_get(el_frm, 'inst_name'), 
                    i:form_get(el_frm, 'inst_iname'),
                    d:form_get(el_frm, 'inst_desc'),
                    l:form_get(el_frm, 'inst_lock')
        };
        
        if(sel != null) {
            data.g = sel;
        }
        
        frm.append('data', '{"cmd":64}');
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
    (function() {
        var l = $('.installGroupList');
        var p = $('.installGroupPage');
        var n = {page:'main/module',
                 sub:'module_install',
                 pg:'sub.requestGroups(p)',
                 kd:'sub.requestGroups(parseInt(this.value)-1, event)'
        };
        
        list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function(o) {
            sel = o.id;
            onChange();
        });
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        };
        
        sub.resetGroups = function() {
            sel = null;
            onChange();
            paging_reset(n);
            sub.requestGroups();
        }
        
        var s = list_search($('#instFilter'), sub.resetGroups);
        
        sub.requestGroups = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    post('/sys/server/', {data:JSON.stringify({cmd:15}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        render(r);
                    });
                }
            }, l, p, n, po);
        };
    })();
 });addA("main/module","module_upload",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.moduleUpld', {'style':1, customEvent:autofill});
     });addS("main/module", "_sid12","\n    #ubox {\n        background: #fff;\n        border-radius: 0.285714rem;\n        border: 1px solid #dedede;\n        height: 40px;\n        font-size: 1em;\n        cursor: pointer;\n        padding: 0.67857143em 1em;\n        line-height: 1.21428571em;\n        text-overflow: ellipsis;\n        overflow: hidden;\n        white-space: nowrap;\n    }\n    #ubox.empty {\n        color:#cacaca;\n    }\n    #ubox.drop {\n        background:#54a3e1;\n        color:#fff;\n    }\n");addJ("main/module","module_upload",function(ctx, path, sub) { 
    var _this = this;
    var _canClose = true;
    var _modal = $('.ui.modal.moduleUpld');
    var _btn = _modal.find('.accept.button');
    var _frm = _modal.find('.ui.form');
    var sel = null;
    var ct = _modal.find('.content');
    var serr = error_init(ct, polyglot.t('module.eh_upld'), polyglot.t('module.e_ufile'));
    
    sub.progress = function(l, t, i) {
        $(i).progress({percent:(l * 100) / t});
    };
    
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                    
    $('#upld_name').on('input', onChange);
                  
    function onChange() {
        var v = $('#upld_name').val();
        if(v === '' || sub.getFile() == null) {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    } 
                   
    sub.onOpen = function(after) {
        sub.after = after;
        submit_err(-1, true);
        var n = $('#upld_name');
        label_reset(n);
        $('#upldFilter')[0].reset();
        label_reset($('#upld_desc'));
        sub.clearFile();
        $('#upld_lock').prop('checked', false);
        sub.resetGroups();
        n.focus();
        _frm[0].reset();
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
        var f = _modal.find('input.submit');
        f.click();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.moduleUpldE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('module.e_exist');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('module.e_upld');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
    this._module_upload = function(ev, el_frm) {
        if(el_frm.checkValidity()) {
            ev.preventDefault();
        } else {
            return;
        }        
        _canClose = false;
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var data = {n:form_get(el_frm, 'upld_name'), 
                    d:form_get(el_frm, 'upld_desc'),
                    l:form_get(el_frm, 'upld_lock')
        };
        
        if(sel != null) {
            data.g = sel;
        }
        
        var loader = loader_init(ct, function() {
            return '<div style="width:50%;">' +
                        '<div class="ui active progress upldProg">' +
                          '<div class="bar">' +
                            '<div class="progress"></div>' +
                          '</div>' +
                          '<div class="label">' + polyglot.t('module.load') + '</div>' +
                        '</div>' +
                    '</div>';
        });
        loader.show();
    
        frm.append('data', '{"cmd":5}');
		frm.append('parent', '');
		frm.append('name', 'file');
	    frm.append('file', sub.getFile());
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/upload/', frm, function(d) {
            loader.hide();
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json', noprogress:5000, 'upload.onprogress': function(ev) {
                sub.progress(ev.loaded, ev.total, '.upldProg');
        }});
    };
    
    (function() {
        var l = $('.uploadGroupList');
        var p = $('.uploadGroupPage');
        var n = {page:'main/module',
                 sub:'module_upload',
                 pg:'sub.requestGroups(p)',
                 kd:'sub.requestGroups(parseInt(this.value)-1, event)'
        };
        
        list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function(o) {
            sel = o.id;
            onChange();
        });
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        };
        
        sub.resetGroups = function() {
            sel = null;
            onChange();
            paging_reset(n);
            sub.requestGroups();
        }
        
        var s = list_search($('#upldFilter'), sub.resetGroups);
        
        sub.requestGroups = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    post('/sys/server/', {data:JSON.stringify({cmd:15}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        render(r);
                    });
                }
            }, l, p, n, po);
        };
    })();
    
    (function() {
        var dropBox = $('#ubox');
        var file = $('input[type="file"]');
        var cu = null;
        
        sub.getFile = function() {
            return cu;
        }
        
        sub.clearFile = function() {
            setFile(null);
        }
        
        var setFile = function(file) {
            cu = file;
            if(file) {
                dropBox.text(file.name);
                dropBox.parent().addClass('fl-is-active');
                dropBox.removeClass('empty');
                Archive.init();
                var archive = Archive.open(file, function(a) {
                    a.extractSingleFile("minfo", function(f) {
                        var rd = new FileReader();
                        rd.onload = function() {
                            try {
                                var d = CBOR.decode(rd.result);
                                if(d.m && d.m.n) {
                                    var n = $('#upld_name');
                                    if(n.val() == '') {
                                        label_set(n, d.m.n);
                                    }
                                }
                                if(d.m && d.m.d) {
                                    var n = $('#upld_desc');
                                    if(n.val() == '') {
                                        label_set(n, d.m.d);
                                    }
                                }
                                onChange();
                            } catch(e) {
                                // TODO error
                            }
                        };
                        rd.readAsArrayBuffer(f);
                    }, function() {
                        // TODO error
                    });
                });        
            } else {
                dropBox.text(polyglot.t('module.dropp'));
                dropBox.parent().removeClass('fl-is-active');
                dropBox.addClass('empty');
            }
            onChange();
        }
        
    	var handleFiles = function(items, idx) {
    	    if(items) {
    	        if(idx < items.length) {
        	        var file = items[idx];
        	        setFile(file);
    	        }
    	    } else {
                serr.show();
    	    }
    	}
    	
        var parseFileList = function(list) {
            var info = {};
            var result = [];
			for(var i = 0, len = list.length; i < len; i++) {
				if(list[i].webkitGetAsEntry && list[i].kind=='file') {
					var item = list[i].webkitGetAsEntry();
					if(item) {
						parseFiles(info, item,result);
						if(info.error)
						    return null;
					}
				}
			}
			return info.error ? null : result;
		}
		
    	var parseFiles = function(info, item, result) {
    	    if(info.error)
    	        return;
			if(item.isFile) {
			    result.push(item);
			} else 
			if(item.isDirectory) {
				var rd = item.createReader();
		    	rd.readEntries(function(items, a) {
					if(items.length != 0) {
    					var l = [];
    					for(var i = 0, len = items.length; i< len; i++) {
    					    parseFiles(info, items[i], result);
    					    if(info.error)
    					        return;
    					}
					}
				}, function(){
				    info.error = true;
				    /* doUploadEnd(info);  */
				});
			}
		}
        
        file.on('change', function(e) {
            handleFiles(file[0].files, 0);
        });
        dropBox.on('click', function() {
            file.trigger('click');
        });
        
        dropBox[0].ondrop = function(e) {
            e.preventDefault();  
            dropBox.removeClass('drop');
            if(!e.dataTransfer) {
                return false;
            }
            var items;
            if ((items = e.dataTransfer.items)) {
            } else 
            if((items = e.dataTransfer.files)){
            } else {
                return false;
            }
            
            var farr = parseFileList(items);
            
            var fileData = function(items, idx, result, after) {
                if(idx < items.length) {
    			    items[idx].file(function(file) {
    			        result.push(file);
					    fileData(items, idx + 1, result, after);
					}, function(){
					    after(null);
					});
                } else {
                    after(result);
                }
            }
            
            fileData(farr, 0, [], function(r) {
                handleFiles(r, 0);
            });
            
        } 
        
        dropBox[0].ondragover = function(e) {
            e.preventDefault();
            dropBox.addClass('drop');
        }
        
        dropBox[0].ondragleave = function(e) {
            e.preventDefault();
            dropBox.removeClass('drop');
        }
    })();
 });addA("main/module","module_add",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.moduleAdd', {'style':1, customEvent:autofill});
     });addS("main/module", "_sid11","\n");addJ("main/module","module_add",function(ctx, path, sub) { 
    var _this = this;
    var _canClose = true;
    var _modal = $('.ui.modal.moduleAdd');
    var _btn = _modal.find('.accept.button');
    var sel = null;
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                    
    $('#add_name').on('input', onChange);
                  
    function onChange() {
        var v = $('#add_name').val();
        var v1 = $('#add_iname').val();
        if(v === '' || v1 === '') {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    } 
                   
    sub.onOpen = function(after) {
        sub.after = after;
        submit_err(-1, true);
        var n = $('#add_name');
        label_reset(n);
        $('#addFilter')[0].reset();
        label_reset($('#add_desc'));
        label_reset($('#add_iname'));
        $('#add_lock').prop('checked', false);
        sub.resetGroups();
        n.focus();
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
        var f = _modal.find('input.submit');
        f.click();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.moduleAddE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('module.e_exist');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('module.e_add');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
    this._module_add = function(ev, el_frm) {
        if(el_frm.checkValidity()) {
            ev.preventDefault();
        } else {
            return;
        }        
        _canClose = false;
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var data = {n:form_get(el_frm, 'add_name'), 
                    i:form_get(el_frm, 'add_iname'),
                    d:form_get(el_frm, 'add_desc'),
                    l:form_get(el_frm, 'add_lock')
        };
        
        if(sel != null) {
            data.g = sel;
        }
        
        frm.append('data', '{"cmd":64}');
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
    (function() {
        var l = $('.moduleGroupList');
        var p = $('.moduleGroupPage');
        var n = {page:'main/module',
                 sub:'module_add',
                 pg:'sub.requestGroups(p)',
                 kd:'sub.requestGroups(parseInt(this.value)-1, event)'
        };
        
        list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function(o) {
            sel = o.id;
            onChange();
        });
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        };
        
        sub.resetGroups = function() {
            sel = null;
            onChange();
            paging_reset(n);
            sub.requestGroups();
        }
        
        var s = list_search($('#addFilter'), sub.resetGroups);
        
        sub.requestGroups = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    post('/sys/server/', {data:JSON.stringify({cmd:15}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        render(r);
                    });
                }
            }, l, p, n, po);
        };
    })();
 });addS("main/module", "_sid10","\n#editor {\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px;\n}\n\n#right .ui.menu {\n    min-height:1.857143em;\n    margin: 0;\n    overflow:hidden;\n}\n\n#right .ui.menu .item {\n    padding:0.2rem 1rem 0.2rem 1rem;\n}\n\n#right .menu > .item:before {\n    background-color: #dedede;\n}\n\n#right .modulebtn.dropdown .icon {\n    color: #000;\n}\n\n#right .modulebtn.dropdown:not(.selection):hover .icon,\n#right .modulebtn.dropdown:not(.selection).active .icon {\n    color:#FFF;\n}\n");addJ("main/module","module",function(ctx, path, sub) { 
    var _this = this;
    var sel = null;
    var sel_inst = null;
    var sel_data = null;
    var sel_name;
    var moduleCache = module_cache({});
    var deferEdit = defer_init(1);
    var Handlebars;
    var minify;
    var cssmin;
    var do_minify = true;
    var mini_opt = {
                  parse: {
                    bare_returns     : false,
                    ecma             : 8,
                    expression       : false,
                    filename         : null,
                    html5_comments   : true,
                    shebang          : true,
                    strict           : false,
                    toplevel         : null
                  },
                  compress: {
                    arrows           : true,
                    booleans         : true,
                    collapse_vars    : true,
                    comparisons      : true,
                    computed_props   : true,
                    conditionals     : true,
                    dead_code        : true,
                    drop_console     : false,
                    drop_debugger    : true,
                    ecma             : 5,
                    evaluate         : true,
                    expression       : false,
                    global_defs      : {},
                    hoist_funs       : false,
                    hoist_props      : true,
                    hoist_vars       : false,
                    ie8              : false,
                    if_return        : true,
                    inline           : true,
                    join_vars        : true,
                    keep_classnames  : false,
                    keep_fargs       : true,
                    keep_fnames      : false,
                    keep_infinity    : false,
                    loops            : true,
                    negate_iife      : true,
                    passes           : 1,
                    properties       : true,
                    pure_getters     : "strict",
                    pure_funcs       : null,
                    reduce_funcs     : true,
                    reduce_vars      : true,
                    sequences        : true,
                    side_effects     : true,
                    switches         : true,
                    top_retain       : null,
                    toplevel         : false,
                    typeofs          : true,
                    unsafe           : false,
                    unsafe_arrows    : false,
                    unsafe_comps     : false,
                    unsafe_Function  : false,
                    unsafe_math      : false,
                    unsafe_methods   : false,
                    unsafe_proto     : false,
                    unsafe_regexp    : false,
                    unsafe_undefined : false,
                    unused           : true,
                    warnings         : false
                  },
                  mangle: {
                    eval             : false,
                    ie8              : false,
                    keep_classnames  : false,
                    keep_fnames      : false,
                    properties       : false,
                    reserved         : [],
                    safari10         : false,
                    toplevel         : false
                  },
                  output: {
                    ascii_only       : false,
                    beautify         : false,
                    bracketize       : false,
                    comments         : /@license|@preserve|^!/,
                    ecma             : 5,
                    ie8              : false,
                    indent_level     : 4,
                    indent_start     : 0,
                    inline_script    : true,
                    keep_quoted_props: false,
                    max_line_len     : false,
                    preamble         : null,
                    preserve_line    : false,
                    quote_keys       : false,
                    quote_style      : 0,
                    safari10         : false,
                    semicolons       : true,
                    shebang          : true,
                    source_map       : null,
                    webkit           : false,
                    width            : 80,
                    wrap_iife        : false
                  },
                  wrap: false
                };
    
    (function(){
        raw_get('js/module_trans.js', {}, function(d, err) {
            do_visible_path(sub, function() {
                if(err) {
                    
                } else {
                    domy.off(function() {
                        module = exports = {};
                        var head = document.getElementsByTagName("head")[0];
                        var el = document.createElement('script');
                        el.textContent = d;
                        head.insertBefore(el, head.firstChild);
                        head.removeChild(el);
                        Handlebars = exports.exports;
                        minify = exports.minify;
                        cssmin = exports.cssmin;
                        deferEdit.ready();
                    });
                }
            });
        });
    })();
    
    (function(){
        var r = /###.*?###/gm;
        var load_dom = function(intxt, after) {
            var wait = [];
            
            var fixTxt = function(tin) {
                var pos = 0;
                var out = "";
                if(wait.length == 0) {
                    return tin
                }
                for(var i = 0; i < wait.length; i++) {
                    var w = wait[i];
                    out += tin.slice(pos, w.index);
                    out += w.data;
                    pos = w.index + w.len + 6;
                }
                
                out += tin.slice(pos);
                return out;
            }
            
            var dowait = function(idx, after) {
                if(idx == wait.length) {
                    after();
                } else {
                    wait[idx].w.then(function(data) {
                        load_dom(data, function(r) {
                            wait[idx].data = r;
                            dowait(idx + 1, after);
                        });
                    });
                }
            }
            
            while((ma = r.exec(intxt)) != null) {
                try {
                    var t = ma[0].slice(3, -3);
                    var d = JSON.parse(t);
                    wait.push({index:ma.index,len:t.length,w:$.Deferred(function(dr) {
                        raw_get(d.file, {}, function(v, err, status) {
                            dr.resolve(v, err, status);
                        });
                    }).promise()});
                } catch(e) {
                }
            }
            
            dowait(0, function() {
                after(fixTxt(intxt));
            });
        };
        
        var jsonEscape = function(txt, start, end) {
            var l = txt.length;
            var i = start;
            var o = "";
            if(start != 0)
                o = txt.substr(0, start);
            for(;i < end; i++)
            {
                var c = txt.charCodeAt(i);
                switch(c)
                {
                    case 34:
                            o += '\\"';
                    break;
                    case 92:
                            o += '\\\\';
                    break;
                    case 47:
                            o += '\/';
                    break;
                    case 8:
                            o += '\\b';
                    break;
                    case 12:
                            o += '\\f';
                    break;
                    case 10:
                            o += '\\n';
                    break;
                    case 13:
                            o += '\\r';
                    break;
                    case 9:
                            o += '\\t';
                    break;
                    default:
                            o += String.fromCharCode(c);
                    break;
                }
            }
            if(end != l)
                o += txt.substr(end, l - end);
            return o;
        };
        
        var patchNode = function(ctx, n) {
            var children = n.childNodes || [];
            var body = n.nodeName == 'BODY';
            for(var i =0, l = children.length; i < l; i++) {
                var c = children[i];
                if(c) {
                    if(c.nodeType == 3 && 
                       !/\S/.test(c.nodeValue)) {
                        n.replaceChild(document.createTextNode(''), c);
                    } else {
                        if(c.nodeName == 'STYLE') {
                            if(do_minify) {
                                c.textContent = cssmin(c.textContent);
                            }
                            
                            var r = c.sheet.cssRules;
                            if(r.length) {
                                var m = '[';
                                for(var j = 0; j < r.length; j++) {
                                    var txt = r[j].cssText;
                                    var ri = txt.indexOf('{');
                                    var rl = txt.substr(0, ri).split(',');
                                    var rlen = rl.length;
                                    if(rlen != 1) {
                                        var out = ''
                                        for(var h = 0; h < rlen - 1; h++) {
                                            out += '"' + jsonEscape(rl[h], 0, rl[h].length) + ',",';
                                        }
                                        m += out;
                                        txt = rl[rlen - 1] + txt.substr(ri);
                                    }
                                    txt = jsonEscape(txt, 0, txt.length);
                                    m += '"' + txt + '",';
                                }
                                m = m.slice(0, -1);
                                m += ']';
                                ctx.tmpl_data = 'addM(0,' + m + ');' + ctx.tmpl_data;
                            }
                            c.parentNode.removeChild(c);
                            i--;
                            l--;
                        } 
                        else if(c.nodeName == 'SCRIPT') {
                            if(c.hasAttribute && c.hasAttribute('lang')) {
                                try {
                                    var txt = JSON.stringify(JSON.parse(c.textContent));
                                    ctx.lang_data = 'addML("' + c.getAttribute('lang')  + '",function() { return ' + txt + ' });' + ctx.lang_data;
                                } catch(e) {
                                    console.log('lang:', e);
                                }
                            } else {
                                if(do_minify) {
                                    var m = minify(c.textContent, mini_opt);
                                    if(!m.error) {
                                        c.textContent = m.code;
                                    }
                                }
                                ctx.tmpl_data = 'addM(1,function(ctx, lib) { ' + c.textContent + ' });' + ctx.tmpl_data;
                            }
                            c.parentNode.removeChild(c);
                            i--;
                            l--;
                        } else {
                            patchNode(ctx, c);
                        
                            if(c.hasAttribute && c.hasAttribute('module_submit')) {
                                var submit = c.getAttribute('module_submit');
                                c.setAttribute('onsubmit', "var t = this;(function(){var ctx=getMCtx(t),lib=ctx.lib,f=function(event) {" + submit + "};f.call(t, event)})()");
                                c.removeAttribute('module_submit');
                            }
                            
                            if(c.hasAttribute && c.hasAttribute('module_click')) {
                                var submit = c.getAttribute('module_click');
                                c.setAttribute('onclick', "var t = this;(function(){var ctx=getMCtx(t),lib=ctx.lib,f=function(event) {" + submit + "};f.call(t, event)})()");
                                c.removeAttribute('module_click');
                            }
                        
                            if(body) {
                                var txt = c.outerHTML;
                                txt = Handlebars.precompile(txt || '');
                                ctx.tmpl_data = 'addM(2,' + txt + ');' + ctx.tmpl_data;
                            }
                        }
                    }
                }
            }
        };
        
        var getDoc = function(iframe) {
            var doc;
            if(iframe.contentDocument)
                    doc = iframe.contentDocument;
            else
            if(iframe.contentWindow)
                    doc = iframe.contentWindow.document;
            return doc;
        };
        
        sub.genTmpl = function(intxt, result) {
            var ifrm = $('<iframe style="display:hidden;">');
            var node = ifrm[0];
            var ctx = {tmpl_data:'',lang_data:''};
            load_dom(intxt, function(r) {
                try {
                    node.srcdoc = r;
                    node.onload = function() {
                        var doc = getDoc(node);
                        patchNode(ctx, doc);
                        node.parentNode.removeChild(node);
                        result(ctx.lang_data + ctx.tmpl_data);
                    }
                    ifrm.appendTo("body");
                } catch(e) {
                    result('');
                    console.log(e);
                }
            });
        }
    })();
    
    this.moduleAdd = function() {
        $('.ui.modal.moduleAdd').modal('show');
        ctx['module_add'].onOpen(function(d) {
            sub.onAddModule(d);
            change.module_edit(d.id, d.n, 0);
        });
    };
    
    this.moduleUpld = function() {
        $('.ui.modal.moduleUpld').modal('show');
        ctx['module_upload'].onOpen(function(d) {
            sub.onAddModule(d);
            change.module_edit(d.id, d.n, 0);
        });
    };
    
    this.moduleInst = function() {
        $('.ui.modal.moduleInst').modal('show');
        ctx['module_install'].onOpen(function() {
            
        });
    };
    
    var srcLabel = $('#moduleSrcLabel')[0];
    var setupLabel = $('#moduleLabel')[0];
    var cfgLabel = $('#moduleCfgLabel')[0];
    var mFilter = search_filter('#moduleFilter', '#left'); 
    var iFilter = search_filter('#moduleIFilter', '#center_middle');   
    var uFilter = search_filter('#usesFilter', '#uses');
    
    var inst = {};
    var lockInst = lock_post_init(inst);
    
    $('#topbar .ui.edit.dropdown').dropdown({
       transition: 'fade up',
       context: 'body',
       action:'hide'
    });  
    
    var lock = lock_post_init(sub);
    var psel = sel_ready_init();
    (function(){
        var clr = $('#mlogClear'); 
        var txt = $('#mlogTxt'); 
        clr.on('click', function() {
            txt[0].textContent = '';
        });
        sub.onCompileError = function(e, id, kversion, machine, data) {
            var t = txt[0].textContent += data.e;
        }
        $(document).on('onCompileError', sub.onCompileError);
    })();
    
    (function(){
        var bn;
        var c = $('#right .ui.modulesel.dropdown');
        var b = $('#right .ui.modulebtn.dropdown');
        var r = $('#right');
        var idx = -1;
        
        c.dropdown({
           transition: 'fade up',
           context: 'body',
           onChange: function(value, text, $choice) {
                idx = $(c[0].firstChild).children().index($choice[0]);
                b.children().first().text(polyglot.t('module.view_p') + text);
                bn = {name:'', src:text.toLowerCase() + (idx < 3 ? '.html' : '')};
                sub.onChangeSrc();
           }
        });
        
        sub.getIdx = function() {
            return idx;
        }
        
        sub.toSendIdx = function(idx) {
            return idx > 2 ? idx + 61 : idx;
        }
        
        sub.getSendSel = function() {
            return idx > 2 ? sel_inst : sel;
        }
        
        sub.onChangeSrc = function() {
            if(sel) {
                bn.name = sel_name;
                srcLabel.innerText = polyglot.t('module.sedit', bn);
                
                do_visible_split(r, function() {
                    psel.on_ready(function() {
                        var oidx = idx;
                        var cKey = sel;
                        var d = JSON.stringify({a:sub.getSendSel(),b:sub.toSendIdx(idx)});
                        if(oidx > 2) {
                            if(sel_inst == null) {
                                sub.setTextError(false, 'module.noinst');
                                return;
                            }
                            cKey = sel + '_' + sel_inst;
                        }
                        sub.beginLoad();
                        if(sel_data && (sel_data.p == -1 || hasPerm('MODULE_SOURCE_EDIT', sel_data.p, sel_data.u))) {
                            b.addClass('disabled');
                            b.addClass('nomouse');
                            moduleCache.get(moduleCache.genKey(cKey, oidx), function(f) {
                                lock.raw_post('/sys/server/', {data:JSON.stringify({cmd:70}), ext_data:d}, f);
                            }).then(function(d, err, status) {
                                b.removeClass('disabled');
                                b.removeClass('nomouse');
                                do_visible_path(sub, function() {
                                    if(err) {
                                        if(oidx > 2 && status == 404) {
                                            sub.setText("");
                                        } else {
                                            sub.setTextError();
                                        }
                                    } else {
                                        sub.setText(d);
                                    }
                                });
                            });
                        } else {
                            sub.setTextError();
                        }
                    });
                });
            } else {
                clear_visible_split(r);
                bn.name = polyglot.t('main.nofile');
                srcLabel.innerText = polyglot.t('module.sedit', bn);
            }
        }
    
        _this.moduleSel = function() {
            c.css('margin-left', b.position().left + 'px');
            c.css('width', b.outerWidth(true) + 'px');
            c.click();
        };
        
        c.dropdown('set selected', polyglot.t('module.view_r'));
    })();
    
    visibility_init(sub, $('#topbar .ui.visibility.dropdown'), function(i) { 
        switch(i) {
            case 2:
                return sub.pane_v(1)
            case 6:
                return sub.pane_v(2)
            default:
                return sub.pane(i > 2 ? i - 1 : i);
        }
    });
    
    (function(){
        $('#right').css('display', 'none');
        $('#uses').css('display', 'none');
        $('#cfg').css('display', 'none');
        $('#center_bottom').css('display', 'none');
        
        var _ctx = {};
        var _sizes = [15, 20, 30, 20, 15];
        var _fill =[5, 0, 0, 0, 5];
        var _panes = ['#left', '#cfg', '#center','#right', '#uses'];
        
        var _ctx_v = {dir:'vertical'};
        var _sizes_v = [40, 40, 20];
        var _fill_v =[30, 0, 0];
        var _panes_v = ['#center_top', '#center_middle', '#center_bottom'];
        
        sub.pane = function(i) {
            return _panes[i];
        }
        
        sub.pane_v = function(i) {
            return _panes_v[i];
        }
        
        sub.split = function() {
            doSplit(_panes, _sizes, _ctx, ['#left', '#uses'], _fill);
            doSplit(_panes_v, _sizes_v, _ctx_v, undefined, _fill_v);
        }
        
        sub.split();
        
    })();
    
    (function() {
        var editor = ace.edit('editor');
        var cedit = $(editor.container);
        var loader = loader_init(cedit);
        var serr = error_init(cedit, polyglot.t('main.eh_load'), polyglot.t('module.e_load'));
        
        hide_init(cedit);
        
        editor.setTheme('ace/theme/textmate');
        editor.session.setMode('ace/mode/c_cpp');
        var err = $('.moudleSrcError');
        
        var differ = Differ(editor);
        
        var session = editor.getSession();
        session.setValue('');
        
        
        differ.onFocus = function(){};
        differ.onBlur = function(){};
        differ.textChanged = function(c){
            var t = srcLabel.innerText;
            if(t[0] == '*') {
                t = t.substr(1);
            }
            srcLabel.innerText = (c ? '*' : '' ) + t;
        };
        differ.fullUndo = function(){
            
        };
        differ.textSaved = function(d){
		    var _this = this;
            var fd = new FormData();
            var oidx = sub.getIdx();
			var blob = new Blob([d.r.getResult()], { type: 'application/octet-stream'});
			var data = {cmd:3, id:sel, x:oidx};
			var sn = sel_name;
			var cKey = data.id;
			var iid = sel_inst;
			if(oidx > 2) {
			    data.x -= 3;
			    data.y = sel_inst;
			    data.cmd += 1;
                cKey = sel + '_' + sel_inst;
                blob = new Blob([session.getValue()], {type:'text/plain'});
			}
			fd.append('data', JSON.stringify(data));
			fd.append('parent', '');
			fd.append('name', 'file');
		    fd.append('file', blob);
            loader.show();
            // TODO transform html to template and save it too
            lock.post('/sys/upload/', fd, function(d) {
                var r = d.constructor === String ? JSON.parse(d) : d;
                loader.hide();
                if(r.r == 0) {
                    var after = function(err) {
                        if(!err) {
                            var v = session.getValue();
                            change.module_edit(cKey, sn, 2);
                            moduleCache.update(moduleCache.genKey(cKey, data.x), v).then(function() {
                                $.event.trigger({ type: "sourceChange"}, [data.id, data.x, v]);
                            });
                            _this.finishSave();
                        } else {
                            _this.abortSave();
                            serr.show();
                        }
                    }
                    if(data.cmd == 3 && data.x < 3) {
                        var v = session.getValue();
                        deferEdit.then(function(){
                            sub.genTmpl(v, function(m) {
                                fd = new FormData();
			                    blob = new Blob([m], { type: 'application/octet-stream'});
                    			fd.append('data', JSON.stringify({cmd:3, id:data.id, x:oidx + 3}));
                    			fd.append('parent', '');
                    			fd.append('name', 'file');
                    		    fd.append('file', blob);
                                lock.post('/sys/upload/', fd, function(d) {
                                    var r = d.constructor === String ? JSON.parse(d) : d;
                                    loader.hide();
                                    if(r.r == 0) {
                                        moduleCache.update(moduleCache.genKey(cKey, oidx + 3), m).then(function() {
                                            $.event.trigger({ type: "tmplChange"}, [data.id, iid, data.x, m]);
                                        });
                                    }
                                    after(r.r != 0);
                                });
                            });
                        });
                    } else {
                        after();
                    }
                } else {
                    _this.abortSave();
                    serr.show();
                }
            });
        };
        
        _this.moduleSave = function() {
            differ.save(); 
        };
        
        sub.beginLoad = function() {
            cedit.show();
            editor.setReadOnly(true);
            loader.show();
            serr.hide();
        };
        
        sub.setTextError = function(r, e) {
            serr.hide();
            cedit.hide();
            e = !e ? (r ? polyglot.t('main.nofile') : polyglot.t('main.lerr')) : polyglot.t(e);
            err.text(e);
        };
        
        sub.setText = function(v) {
            serr.hide();
            cedit.show();
            session.setValue(v);
            editor.setReadOnly(false);
            editor.session.setScrollTop(0);
            loader.hide();
        };
    })();
    
    (function() {
        var c = $('#center');
        var s = $('#center_top .grid_c');
        var e = $('#center_top .grid_e');
        var ct = $('#center_top .content');
        var loader = loader_init(s);
        var serr = error_init(s, polyglot.t('main.eh_load'), polyglot.t('module.e_load'));
        var k = null;
        
        hide_init(s);
        var _cSetup = null;
        
        sub.tmplChange = function(e, id, iid, x, v) {
            if(k === id && x == 0) {
                var key;
                if(_cSetup != null) {
                    key = moduleCache.genKey(_cSetup, 3);
                    moduleCache.remove(key);
                    moduleCache.unload(key);
                    _cSetup = null;
                }
                var d = JSON.stringify({a:id,b:3});
                key = moduleCache.genKey(id, 3);
                moduleCache.get(key, function(f) {
                    loader.show();
                    lock.raw_post('/sys/server/', {data:JSON.stringify({cmd:70}), ext_data:d}, f);
                }).then(function(d, err) {
                    loader.hide();
                    do_visible_path(sub, function() {
                        if(err) {
                            serr.show();
                        } else {
                            _cSetup = id;
                            moduleCache.load(key, d, ct, {prefix:'.moduleICtx ', ty:0, mid:id, iid:iid});
                        }
                    });
                });
            }
        };
        
        $(document).on('tmplChange', sub.tmplChange);
        
        sub.getSetup = function(id, inst_id) {
            k = id;
            if(id !== null) {
                serr.hide();
                s.show();
                e.text(polyglot.t('module.noinst'));
                do_visible_split(c, function() {
                    psel.on_ready(function() {
                        var key;
                        if(_cSetup != null) {
                            key = moduleCache.genKey(_cSetup, 3);
                            moduleCache.remove(key);
                            moduleCache.unload(key);
                            _cSetup = null;
                        }
                        var d = JSON.stringify({a:id,b:3});
                        key = moduleCache.genKey(id, 3);
                        if(sel_data && (sel_data.p == -1 || hasPerm('MODULE_SETUP', sel_data.p, sel_data.u))) {
                            moduleCache.get(key, function(f) {
                                loader.show();
                                lock.raw_post('/sys/server/', {data:JSON.stringify({cmd:70}), ext_data:d}, f);
                            }).then(function(d, err) {
                                loader.hide();
                                do_visible_path(sub, function() {
                                    if(err) {
                                        serr.show();
                                    } else {
                                        _cSetup = id;
                                        moduleCache.load(key, d, ct, {prefix:'.moduleICtx ', ty:0, mid:id, iid:inst_id});
                                    }
                                });
                            });
                        } else {
                            s.hide();
                            e.text(polyglot.t('main.lerr'));
                        }
                    });
                });
            } else {
                if(_cSetup != null) {
                    key = moduleCache.genKey(_cSetup, 3);
                    moduleCache.remove(key);
                    moduleCache.unload(key);
                    _cSetup = null;
                }
                s.hide();
            }
        }
    })();
        
    (function() {
        var cf = $('#cfg');
        var c = $('#cfg .grid_c');
        var s = $('#center_top .grid_c');
        var e = $('#cfg .grid_e');
        var b = c.find('button');
        var i = $('#cfg .moduleInst');
        var lbl = $('#cfg .moduleInstLbl');
        var ct = {};      
        var ch = false;
        var wp = false;
        var mDesc = $('#moduleDesc');
        var mGID = $('#moduleGID');
        var mUID = $('#moduleUID');
        var mLock = $('#moduleLock');
                            
        var loader = loader_init(c);
        var serr = error_init(c, polyglot.t('main.eh_save'), polyglot.t('module.e_csave'));
        
        hide_init(c);
        hide_init(s);
        
        var oi = function() {
            if(wp && !ch) {
                ch = true;
                b.attr('disabled', false);
            }
        };   
        mDesc.on('input', oi);
        mGID.on('input', oi);
        mUID.on('input', oi);
        mLock.closest('.ui.checkbox').checkbox({
                onChecked:oi,
                onUnchecked:oi});
                
        b.on('click', function() {
            var d = post_get_val(sel_data,
                                ['d', 'u', 'g', 'l'],
                                ['a', 'o', 'p', 'q'],
                                [mDesc, mUID, mGID, mLock]);
            if(d) {
                var c = d ? d.c : function() {};
                d = d ? d.r : null;
                loader.show();
                d.m = sel;
                var sn = sel_name;
                lock.post('/sys/server/', {data:JSON.stringify({cmd:65}), ext_data:JSON.stringify(d)}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.hide();
                    if(r.r == 0) {
                        change.module_edit(d.m, sn, 2);
                        c();
                        ch = false;
                        b.attr('disabled', true);
                    } else {
                        serr.show();
                    }
                });
            }
        });
        
        _this.getMInfo = function() {
            serr.hide();
            var d = {};
            var v1 = false;
            var v2 = false;
            
            if(sel_inst && ct.sel_inst != sel_inst) {
                d.iid = sel_inst;
                v2 = true;
                i.show();
            } else if(sel_inst == null) {
                i.hide();
            }
            
            if(sel && ct.sel != sel) {
                d.mid = sel;
                v1 = true;
            } else if(sel == null) {
                v2 = false;
                c.hide();
            }
            
            ct.sel = sel;
            ct.sel_inst = sel_inst;
            
            if(v1 || v2) {
                psel.set_ready(false);
                var ov = sel_data;
                var nv = {};
                var id = sel;
                sel_data = null;
                wp = false;
                ch = false;
                b.attr('disabled', true);
                loader.show();
                c.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:61}), ext_data:JSON.stringify(d)}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    wp = true;
                    loader.hide();
                    sel_data = nv;
                    if(r.r == 0) {
                        c.show();
                        var old = get_visible_split(cf); 
                        if(v1) {
                            $.extend(nv, r);
                        } else {
                            $.extend(nv, {d:ov.d,g:ov.g,u:ov.u,l:ov.l,p:ov.p});
                        }
                        if(v2) {
                            $.extend(nv, r);
                        } else {
                            $.extend(nv, {});
                        }
                        do_visible_split(cf, function() {
                            if(v1) {
                                wp = sel_data.p == -1 || hasPerm('MODULE_EDIT', sel_data.p, sel_data.u);
                                b.attr('disabled', true);
                                c.show();
                                label_set($('#moduleId'), id);
                                label_set($('#moduleName'), r.n);
                                label_set(mDesc, r.d);
                                label_set(mGID, r.g);
                                label_set(mUID, r.u);
                                label_set(mLock, r.l);
                            } else {
                                if(old) {
                                    old();
                                }
                            }
                            if(v2) {
                                label_set($('#moduleIId'), ct.sel_inst);
                                label_set($('#moduleIName'), r.i);
                                lbl.text(polyglot.t('module.icfg', {name:r.i}));
                            }
                        });
                    } else {
                        e.text(polyglot.t('main.lerr'));
                        c.hide();
                    }
                    psel.set_ready(true);
                });
                
                if(sel != null && sel_inst != null) {
                    sub.getSetup(sel, sel_inst);
                } else {
                    sub.getSetup(null);
                }
            } else {
                sub.getSetup(null);
                clear_visible_split(cf);
            }
        };
        
        _this.onChange = function(o) {
            var an = {name:polyglot.t('module.nomodule')};
            var cn = {name:polyglot.t('module.nomodule')};
            sub.clearInst();
            if(o !== undefined) {
                sel = o.id;
                sel_name = o.n;
                sub.requestUses();
                sub.requestInst();
                an.name = sel_name;
                cn.name = sel_name;
                s.show();
            } else {
                sel = null;
                sub.clearUses();
                s.hide();
            }
            cfgLabel.innerText = polyglot.t('module.mcfg', an);
            setupLabel.innerText = polyglot.t('module.medit', cn);
            sub.setTextError(true);
            _this.onChangeInst();
            _this.getMInfo();
            sub.onChangeSrc();
        };
        
        _this.onChangeInst = function(o) {
            if(o !== undefined) {
                sel_inst = o.id;
                sel_inst_name = o.n;
            } else {
                sel_inst = null;
                sub.unselectInst();
            }
            _this.getMInfo();
            if(sub.getIdx() > 2) {
                sub.onChangeSrc();
            }
        }
    })();
    
    (function() {
        var l = $('.moduleList');
        var p = $('.modulePage');
        var n = {page:'main/module',
                 sub:'module',
                 pg:'sub.requestModules(p)',
                 kd:'sub.requestModules(parseInt(this.value)-1, event)'
        };
        
        var nl = 0;
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChange);
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.onAddModule = function(d) {
            if(l.find('.item').length == 0) {
                l.html('');
            }
            l.prepend(m(d));
            j(l.children().first());
        }
        
        sub.resetModules = function() {
            paging_reset(n);
            sub.requestModules();
        }
        
        var s = list_search(mFilter, sub.resetModules);
        
        sub.lockList = function() {
            if(nl == 0) {
                mFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        sub.unlockList = function() {
            nl--;
            if(nl == 0) {
                mFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        sub.requestModules = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            _this.onChange();
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:60}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        var rm = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('module.rem', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('module.e_rem'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:66}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        change.module_edit(o.id, o.n, 1);
                        it.remove();
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        var rn = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('module.ren', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="moduleRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="moduleRName" name="moduleRName" class="ui input" value="' + o.n + '" required></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('module.e_ren'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                var nn = d.val();
                if(nn !== '') {
                    loader.show();
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:65}), ext_data:JSON.stringify({m:o.id, c:nn})}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.remove();
                        if(r.r == 0) {
                            change.module_edit(o.id, nn, 2);
                            o.n = nn;
                            it.replaceWith(m(o))
                            serr.remove();
                            sub.unlockList(); 
                            lb.destroy();
                        } else {
                            it.replaceWith(m(o));
                            serr.show();
                        }
                    });
                }
            };
        } 
        
        var ai = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('module.i_addi', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="moduleRIName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="moduleRIName" name="moduleRIName" class="ui input" value="" required></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('module.e_addi'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                var nn = d.val();
                if(nn !== '') {
                    loader.show();
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:73}), ext_data:JSON.stringify({n:o.id, a:nn})}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.remove();
                        if(r.r == 0) {
                            change.module_edit(o.id, o.n, 2);
                            it.replaceWith(m(o))
                            serr.remove();
                            sub.unlockList(); 
                            lb.destroy();
                        } else {
                            it.replaceWith(m(o));
                            serr.show();
                        }
                    });
                }
            };
        }
        
        var pk = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('module.pkg', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="modulePName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="modulePName" name="modulePName" class="ui input" value="' + o.n + '.probem" required></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('module.e_ren'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                loader.show();
                var nn = d.val();
                if(nn !== '') {
                    var xhr = lock.post('/sys/server/', {data:JSON.stringify({cmd:62}), ext_data:JSON.stringify({m:o.id, a:nn})}, function(d, err, status) {
                        loader.remove();
                        if(status == 200) {
                            it.replaceWith(m(o))
                            serr.remove();
                            sub.unlockList(); 
                            lb.destroy();
                            
                            var fn = null;
                            var ct = xhr.getResponseHeader("content-type");
                            var cd = xhr.getResponseHeader("content-disposition");
                            if(cd) {
                                fn = cd.substring(cd.indexOf("=") + 1);
                            } else {
                                fn = "unnamed." + ct.substring(ct.indexOf("/") + 1);
                            }
                            
                            if(window.navigator.msSaveOrOpenBlob) {
                                window.navigator.msSaveOrOpenBlob(new Blob([d], {type: ct}), fn);
                            } else {
                                var _el = $('<a></a>').appendTo('body');
                                var el = _el[0];
                                el.href = window.URL.createObjectURL(d);
                                el.download = fn;
                                el.click();
                                _el.remove();
                            }
                            
                        } else {
                            it.replaceWith(m(o));
                            serr.show();
                        }
                    }, {responseType:'blob'});
                }
            };
        } 
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.moduleList .item', 
            callback:function(key, options) {
                _this.onChange();
                j();
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'addi':
                        ai(this.o, this.it);
                        break;
                    case 'pack':
                        pk(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete'},
                'rename':{name:polyglot.t('main.ren'), icon:'edit'},
                'addi':{name:polyglot.t('module.addi'), icon:'add'},
                'pack':{name:polyglot.t('module.pack'), icon:'add'},
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();

    (function() {
        var nl = 0;
        var u = $('#center_middle');
        var l = $('.moduleIList');
        var p = $('.moduleIPage');
        var n = {page:'main/module',
                 sub:'module',
                 pg:'sub.requestInst(p)',
                 kd:'sub.requestInst(parseInt(this.value)-1, event)'
        };
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChangeInst, true);
        
        sub.unselectInst = function() {
            j();
        }
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + (v.n !== '' ? v.n : polyglot.t('module.noname', {id:v.id})) + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.clearInst = function() {
            clear_visible_split(u);
            paging_reset(n);
            p.html('');
            l.html('<div class="list_e">' + polyglot.t('module.nomodule') + '</div>');
            sub.getSetup(null);
        }
        
        sub.resetInst = function() {
            paging_reset(n);
            sub.requestInst();
        }
        
        inst.lockList = function() {
            if(nl == 0) {
                iFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        inst.unlockList = function() {
            nl--;
            if(nl == 0) {
                iFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        var s = list_search(iFilter, sub.resetInst);
        
        var ru = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i,id:sel}));
                    iFilter.attr('disabled', '');
                    l.addClass('nomouse_i');
                    p.addClass('nomouse');
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:72}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        iFilter.attr('disabled', null);
                        l.removeClass('nomouse_i');
                        p.removeClass('nomouse');
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            },l, p, n, po);
        }
        
        sub.requestInst = function(po, ev) {
            do_visible_split(u, function() {
                ru(po, ev);
            });
        }
        
        var rm = function(o, it) {
            inst.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('module.i_rem', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                inst.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('module.e_rem'), function(r) { 
                    r.remove();
                    inst.unlockList();
                });
                loader.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:74}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        it.remove();
                        serr.remove();
                        inst.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        var rn = function(o, it) {
            inst.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('module.i_ren', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="moduleIRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="moduleIRName" name="moduleIRName" class="ui input" value="' + o.n + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                inst.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('module.e_ren'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    inst.unlockList(); 
                });
                var nn = d.val();
                if(nn !== '') {
                    loader.show();
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:65}), ext_data:JSON.stringify({n:o.id, d:nn})}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.remove();
                        if(r.r == 0) {
                            o.n = nn;
                            it.replaceWith(m(o))
                            serr.remove();
                            inst.unlockList(); 
                            lb.destroy();
                        } else {
                            it.replaceWith(m(o));
                            serr.show();
                        }
                    });
                } 
            };
        } 
        
        var cn = function(o, it) {
            inst.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/module'),sub=ctx['module'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('module.i_clone', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="moduleIRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="moduleIRName" name="moduleIRName" class="ui input" value="' + o.n + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                inst.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('module.e_clone'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    inst.unlockList(); 
                });
                loader.show();
                var nn = d.val();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:73}), ext_data:JSON.stringify({m:o.id, a:nn})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        var ni = $(m({id:r.d, n:nn})).prependTo(l);
                        it.replaceWith(m(o))
                        serr.remove();
                        inst.unlockList(); 
                        lb.destroy();
                        ni.click();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        } 
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.moduleIList .item', 
            callback:function(key, options) {
                _this.onChangeInst();
                j();
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'clone':
                        cn(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete'},
                'rename':{name:polyglot.t('main.ren'), icon:'edit'},
                'clone':{name:polyglot.t('main.clone'), icon:'add'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    (function() {
        var u = $('#uses');
        var l = $('.usesList');
        var p = $('.usesPage');
        var n = {page:'main/module',
                 sub:'module',
                 pg:'sub.requestUses(p)',
                 kd:'sub.requestUses(parseInt(this.value)-1, event)'
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.clearUses = function() {
            clear_visible_split(u);
            paging_reset(n);
            p.html('');
            l.html('<div class="list_e">' + polyglot.t('module.nomodule') + '</div>');
        }
        
        sub.resetUses = function() {
            paging_reset(n);
            sub.requestUses();
        }
        
        var s = list_search(uFilter, sub.resetUses);
        
        var ru = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i,id:sel}));
                    uFilter.attr('disabled', '');
                    l.addClass('nomouse_i');
                    p.addClass('nomouse');
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:63}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        uFilter.attr('disabled', null);
                        l.removeClass('nomouse_i');
                        p.removeClass('nomouse');
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        sub.requestUses = function(po, ev) {
            do_visible_split(u, function() {
                ru(po, ev)
            });
        }
    })();
    
    sub.requestModules();
    
    $(document).one('cacheDestroy', function() {
        $(document).off('tmplChange', sub.tmplChange);
        $(document).off('onCompileError', sub.onCompileError);
    });
 });addTmpl("main/probe", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sgrid\"><div id=\"left\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.list",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"probeFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"probeFilter\" name=\"probeFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist probeList paging_inner content\"></div></div><div class=\"ui pagination menu probePage fullw\"></div></div><div id=\"center\"><div id=\"center_top\"><div class=\"ui segment\" style=\"height:100%;padding:0;\"><div id=\"probeCfgLabel\" class=\"ui top attached blue label tov\"></div><div></div><div class=\"grid_c hide\"><form class=\"ui form form_c form-base\" onsubmit=\"event.preventDefault();\"><div class=\"probeCfg cfgTop\"><div class=\"ui header probeCfgLbl\"></div><div class=\"form-row\"><label for=\"probeCfgId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"probeCfgId\" name=\"probeCfgId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"probeIdent\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.ident",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"probeIdent\" name=\"probeIdent\" disabled=\"\"></div></div><div><div class=\"ui header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.setting",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"form-row\"><label for=\"probeId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"probeId\" name=\"probeId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"probeName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"probeName\" name=\"probeName\" disabled=\"\"></div><div class=\"form-row\"><label for=\"probeDesc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"probeDesc\" name=\"probeDesc\"></textarea></div><div class=\"form-row\"><label for=\"probeKey\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.key",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"probeKey\" name=\"probeKey\"></textarea></div><div class=\"form-row\"><label for=\"probeUID\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.uid",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"probeUID\" name=\"probeUID\"></div><div class=\"form-row\"><label for=\"probeGID\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.gid",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"probeGID\" name=\"probeGID\"></div><div class=\"form-row\"><button class=\"ui right blue button\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.save",{"name":"l","hash":{},"data":data}))
    + "</button></div></div></form></div><div class=\"grid_e\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.nosetting",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div id=\"center_bottom\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                        "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.slist",{"name":"l","hash":{},"data":data}))
    + "\n                    </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"pcfgFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"pcfgFilter\" name=\"pcfgFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist pcfgList paging_inner content\"></div></div><div class=\"ui pagination menu pcfgPage fullw\"></div></div></div><div id=\"uses\" class=\"USER_EDIT\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.uses",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"usesFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"usesFilter\" name=\"usesFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled list plist usesList paging_inner content\"></div></div><div class=\"ui pagination menu usesPage fullw\"></div></div></div>";
},"useData":true},"");addA("main/probe","probe",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        } 
        sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addTmpl("main/probe", "topbar",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui edit dropdown item PROBE_ADD\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.edit",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.probe",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx[''],f=function(event) {ctx.probeAdd();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.add",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div></div><div class=\"ui config dropdown item\"><div class=\"text\"></div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.view_r",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.view_c",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div class=\"ui visibility dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.vis",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vtree\" id=\"vlist\" checked=\"\"><label for=\"vlist\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.list",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vsett\" id=\"vsett\" checked=\"\"><label for=\"vsett\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.setting",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vlsett\" id=\"vlsett\" checked=\"\"><label for=\"vlsett\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.slist",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item USER_EDIT\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vuses\" id=\"vuses\"><label for=\"vuses\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.uses",{"name":"l","hash":{},"data":data}))
    + "</label></div></div></div></div>";
},"useData":true},"");addTmpl("main/probe", "modal",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui modal probeAdd\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.add",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.add_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"probeAddE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"divide\" style=\"left:57.5%;bottom: -25px;\"></div><div class=\"ui grid\" style=\"padding:20px;\"><div style=\"width:calc(60% - 2rem);margin:0;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"probe.acfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe_add'],f=function(event) {ctx._probe_add(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"add_login\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.login",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_login\" name=\"add_login\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"add_key\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.key",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"add_key\" name=\"add_key\" rows=\"3\" required=\"required\"></textarea></div><div class=\"form-row\"><label for=\"add_desc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"add_desc\" name=\"add_desc\" rows=\"2\"></textarea></div></form></div></div></div><div style=\"width:40%;margin:0 0 0 2rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.agrp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"fullw\" style=\"height:calc(100% - 2rem);\"><div><div class=\"ui icon input tinput fl-wrap fullw\"><i class=\"angle up link toggl icon\"></i><label for=\"addFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"addFilter\" name=\"addFilter\" class=\"prompt fullw\" type=\"text\"><i class=\"search link icon\"></i></div></div><div class=\"ui segment fullw tlist\" style=\"height:calc(100% - 5rem);\"><div class=\"ui middle aligned celled selection list probeGroupList mlist fullw fullh\"></div></div><div class=\"ui pagination menu probeGroupPage fullw\"></div></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe_add'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div>";
},"useData":true},"");addA("main/probe","probe_add",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.probeAdd', {'style':1, customEvent:autofill});
     });addS("main/probe", "_sid9","\n");addJ("main/probe","probe_add",function(ctx, path, sub) { 
    var _this = this;
    var _canClose = true;
    var _modal = $('.ui.modal.probeAdd');
    var _btn = _modal.find('.accept.button');
    var sel = null;
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                    
    $('#add_login').on('input', onChange);
    $('#add_key').on('input', onChange);
                  
    function onChange() {
        var v = $('#add_login').val();
        var v1 = $('#add_key').val();
        if(v === '' || v1 === '') {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    } 
                   
    sub.onOpen = function(after) {
        sub.after = after;
        submit_err(-1, true);
        var n = $('#add_login');
        label_reset(n);
        $('#addFilter')[0].reset();
        label_reset($('#add_desc'));
        label_reset($('#add_key'));
        sub.resetGroups();
        n.focus();
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
       var f = _modal.find('form'); 
       f.submit();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.probeAddE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('probe.e_exist');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('probe.e_add');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
    this._probe_add = function(ev, el_frm) {
        _canClose = false;
        ev.preventDefault();
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var data = {n:form_get(el_frm, 'add_login'), 
                    d:form_get(el_frm, 'add_desc')
        };
        
        if(sel != null) {
            data.g = sel;
        }
        
        frm.append('data', '{"cmd":41}');
        frm.append('password', form_get(el_frm, 'add_key'));
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
    (function() {
        var l = $('.probeGroupList');
        var p = $('.probeGroupPage');
        var n = {page:'main/probe',
                 sub:'probe_add',
                 pg:'sub.requestGroups(p)',
                 kd:'sub.requestGroups(parseInt(this.value)-1, event)'
        };
        
        list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function(o) {
            sel = o.id;
            onChange();
        });
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        };
        
        sub.resetGroups = function() {
            sel = null;
            onChange();
            paging_reset(n);
            sub.requestGroups();
        }
        
        var s = list_search($('#addFilter'), sub.resetGroups);
        
        sub.requestGroups = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    post('/sys/server/', {data:JSON.stringify({cmd:15}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        render(r);
                    });
                }
            }, l, p, n, po);
        };
    })();
 });addS("main/probe", "_sid8","\n");addJ("main/probe","probe",function(ctx, path, sub) { 
    var _this = this;
    var sel = null;
    var sel_cfg = null;
    var sel_data = null;
    var sel_name;
    var sel_con = false;
    
    var pFilter = search_filter('#probeFilter', '#left');
    var uFilter = search_filter('#usesFilter', '#uses');
    var cFilter = search_filter('#pcfgFilter', '#center_bottom');
    
    var cfg = {};
    var cfgLabel = $('#probeCfgLabel')[0];
    var psel = sel_ready_init();
    var lock = lock_post_init(sub);
    var lockCfg = lock_post_init(cfg);
    
    this.probeAdd = function() {
        $('.ui.modal.probeAdd').modal('show');
        ctx['probe_add'].onOpen(function(d) {
            sub.onAddProbe(d);
        });
    }
    
    $('#topbar .ui.edit.dropdown').dropdown({
       transition: 'fade up',
       context: 'body',
       action:'hide'
    });  
    
    (function(){
        var c = $('#topbar .ui.config.dropdown');
        var m = c.find('.menu');
        c.dropdown({
           transition: 'fade up',
           context: 'body',
           onChange: function(value, text, $choice) {
               c.children().first().text(polyglot.t('probe.view_p') + text);
               var old = sel_con;
               sel_con = m.children().index($choice[0]) != 0;
               if(old != sel_con && sub.resetProbes) {
                sub.resetProbes();
               }
           }
        });
        
        c.dropdown('set selected', polyglot.t('probe.view_r'));
    
    })();
    
    (function() {
        var c = $('#center_top .grid_c');
        var e = $('#center_top .grid_e');
        var i = $('#center_top .probeCfg');
        var lbl = $('#center_top .probeCfgLbl');
        var b = c.find('button');
        var pDesc = $('#probeDesc');
        var pGID = $('#probeGID');
        var pUID = $('#probeUID');
        var pKey = $('#probeKey');
        var ct = {};      
        var ch = false;
        var wp = false;
        var loader = loader_init(c);
        var serr = error_init(c, polyglot.t('main.eh_save'), polyglot.t('probe.e_csave'));
        hide_init(c);
        
        var oi = function() {
            if(wp && !ch) {
                ch = true;
                b.attr('disabled', false);
            }
        };   
        
        pDesc.on('input', oi);
        pGID.on('input', oi);
        pUID.on('input', oi);
        pKey.on('input', oi);
                
        b.on('click', function() {
            var d = post_get_val(sel_data,
                                ['d', 'g', 'u', 'k'],
                                ['b', 'p', 'o', 'c'],
                                [pDesc, pGID, pUID, pKey]);
            if(d) {
                loader.show();
                var c = d ? d.c : function() {};
                d = d ? d.r : null;
                var pd = {data:JSON.stringify({cmd:43})};
                if(d.c) {
                    pd.password = d.c;
                    delete d.c;
                }
                d.m = sel;
                var nm = sel_name;
                if(sel_cfg) {
                    d.n = sel_cfg;
                }
                pd.ext_data = JSON.stringify(d);
                lock.post('/sys/server/', pd, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.hide();
                    if(r.r == 0) {
                        change.probe_edit(d.m, nm, 2);
                        c();
                        ch = false;
                        b.attr('disabled', true);
                    } else {
                        serr.show();
                    }
                });
            }
        });
        
        sub.getCfg = function() {
            serr.hide();
            var d = {};
            var v1 = false;
            var v2 = false;
            
            if(sel_cfg && ct.sel_cfg != sel_cfg) {
                d.sid = sel_cfg;
                v2 = true;
                i.show();
            } else if(sel_cfg == null) {
                i.hide();
            }
            
            if(sel && ct.sel != sel) {
                d.pid = sel;
                v1 = true;
            } else if(sel == null) {
                v2 = false;
                c.hide();
            }
            
            ct.sel = sel;
            ct.sel_cfg = sel_cfg;
            
            if(v1 || v2) {
                var ov = sel_data;
                var nv = {};
                sel_data = null;
                wp = false;
                ch = false;
                b.attr('disabled', true);
                loader.show();
                c.show();
                post('/sys/server/', {data:JSON.stringify({cmd:42}), ext_data:JSON.stringify(d)}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    wp = true;
                    loader.hide();
                    sel_data = nv;
                    if(r.r == 0) {
                        c.show();
                        if(v1) {
                            $.extend(nv, r);
                            label_set($('#probeId'), ct.sel);
                            label_set($('#probeName'), r.n);
                            label_set(pDesc, r.d);
                            label_set(pGID, r.g);
                            label_set(pUID, r.u);
                            label_set(pKey, r.k);
                        } else {
                            $.extend(nv, {d:ov.d,g:ov.g,u:ov.u,k:ov.k});
                        }
                        if(v2) {
                            $.extend(nv, r);
                            label_set($('#probeCfgId'), ct.sel_cfg);
                            label_set($('#probeIdent'), r.i);
                            lbl.text(polyglot.t('probe.icfg', {name:probe_label({n:r.i,id:sel_cfg})}));
                        } else {
                            $.extend(nv, {});
                        }
                    } else {
                        e.text(polyglot.t('main.lerr'));
                        c.hide();
                    }
                });
            }
        };
        
        _this.onChange = function(o) {
            var an = {name:polyglot.t('probe.nosetting')};
            if(o !== undefined) {
                sel = o.id;
                sel_name = o.n;
                sub.requestUses();
                sub.requestCfg();
                an.name = sel_name;
            } else {
                sel = null;
                sub.clearUses();
                sub.clearCfg();
            }
            _this.onChangeCfg();
            cfgLabel.innerText = polyglot.t('probe.pcfg', an);
        };
        _this.onChangeCfg = function(o) {
            if(o !== undefined) {
                sel_cfg = o.id;
                sel_cfg_name = o.n;
            } else {
                sel_cfg = null;
            }
            sub.getCfg();
        }
    })();
    
    (function() {
        var nl = 0;
        var u = $('#center_bottom');
        var l = $('.pcfgList');
        var p = $('.pcfgPage');
        var n = {page:'main/probe',
                 sub:'probe',
                 pg:'sub.requestCfg(p)',
                 kd:'sub.requestCfg(parseInt(this.value)-1, event)'
        };
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChangeCfg, true);
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + (v.n !== '' ? v.n : polyglot.t('probe.noident', {id:v.id})) + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.clearCfg = function() {
            clear_visible_split(u);
            paging_reset(n);
            p.html('');
            l.html('<div class="list_e">' + polyglot.t('probe.noprobe') + '</div>');
        }
        
        sub.resetCfg = function() {
            paging_reset(n);
            sub.requestCfg();
        }
        
        cfg.lockList = function() {
            if(nl == 0) {
                cFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        cfg.unlockList = function() {
            nl--;
            if(nl == 0) {
                cFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        var s = list_search(cFilter, sub.resetCfg);
        
        var ru = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) { 
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i,id:sel}));
                    cFilter.attr('disabled', '');
                    l.addClass('nomouse_i');
                    p.addClass('nomouse');
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:46}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        cFilter.attr('disabled', null);
                        l.removeClass('nomouse_i');
                        p.removeClass('nomouse');
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        sub.requestCfg = function(po, ev) {
            do_visible_split(u, function() {
                ru(po, ev);
            });
        }
        
        var rm = function(o, it) {
            cfg.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('probe.s_rem', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                cfg.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('probe.e_rem'), function(r) { 
                    r.remove();
                    cfg.unlockList();
                });
                loader.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:48}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        it.remove();
                        serr.remove();
                        cfg.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        var rn = function(o, it) {
            cfg.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('probe.s_ren', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="probeRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="probeRName" name="probeRName" class="ui input" value="' + o.n + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                cfg.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('probe.e_ren'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    cfg.unlockList(); 
                });
                var nn = d.val();
                if(nn !== '') {
                    loader.show();
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:43}), ext_data:JSON.stringify({n:o.id, c:nn})}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.remove();
                        if(r.r == 0) {
                            o.n = nn;
                            it.replaceWith(m(o))
                            serr.remove();
                            cfg.unlockList(); 
                            lb.destroy();
                        } else {
                            it.replaceWith(m(o));
                            serr.show();
                        }
                    });
                } 
            };
        } 
        
        var cn = function(o, it) {
            cfg.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('probe.s_clone', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="probeRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="probeRName" name="probeRName" class="ui input" value="' + o.n + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                cfg.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('probe.e_clone'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    cfg.unlockList(); 
                });
                loader.show();
                var nn = d.val();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:47}), ext_data:JSON.stringify({m:o.id, a:nn})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        var ni = $(m({id:r.d, n:nn})).prependTo(l);
                        it.replaceWith(m(o))
                        serr.remove();
                        cfg.unlockList(); 
                        lb.destroy();
                        ni.click();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        } 
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.pcfgList .item', 
            callback:function(key, options) {
                _this.onChangeCfg();
                j();
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'clone':
                        cn(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete'},
                'rename':{name:polyglot.t('main.ren'), icon:'edit'},
                'clone':{name:polyglot.t('main.clone'), icon:'add'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    (function() {
        var l = $('.probeList');
        var p = $('.probePage');
        var n = {page:'main/probe',
                 sub:'probe',
                 pg:'sub.requestProbes(p)',
                 kd:'sub.requestProbes(parseInt(this.value)-1, event)'
        };
        
        var nl = 0;
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChange);
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + probe_label(v) + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.onAddProbe = function(d) {
            change.probe_edit(d.id, probe_label(d), 0);
            if(l.find('.item').length == 0) {
                l.html('');
            }
            l.prepend(m(d));
            j(l.children().first());
        }
        
        sub.resetProbes = function() {
            paging_reset(n);
            sub.requestProbes();
        }
        
        var s = list_search(pFilter, sub.resetProbes);
        
        sub.lockList = function() {
            if(nl == 0) {
                pFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        sub.unlockList = function() {
            nl--;
            if(nl == 0) {
                pFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        sub.requestProbes = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            _this.onChange();
            paging_render(function(n) {
                if(n.iv) {
                    var d = s({i:n.i,p:(n.po || 0)*n.i});
                    if(sel_con) {
                        d.f3 = true;
                    }
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:40}), ext_data:JSON.stringify(d)}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        var rm = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('probe.rem', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('probe.e_rem'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:44}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        change.probe_edit(o.id, '', 1);
                        it.remove();
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        var rn = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('probe.ren', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="probeRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="probeRName" name="probeRName" class="ui input" value="' + o.n + '" required></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('probe.e_ren'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                var nn = d.val();
                if(nn !== '') {
                    loader.show();
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:43}), ext_data:JSON.stringify({m:o.id, a:nn})}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.remove();
                        if(r.r == 0) {
                            o.n = nn;
                            change.probe_edit(o.id,  probe_label(o), 2);
                            it.replaceWith(m(o))
                            serr.remove();
                            sub.unlockList(); 
                            lb.destroy();
                        } else {
                            it.replaceWith(m(o));
                            serr.show();
                        }
                    });
                }
            };
        } 
            
            
        var as = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/probe'),sub=ctx['probe'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('probe.s_adds', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="probeRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="probeRName" name="probeRName" class="ui input" value="" required></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('probe.e_adds'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                var nn = d.val();
                if(nn !== '') {
                    loader.show();
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:47}), ext_data:JSON.stringify({n:o.id, a:nn})}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.remove();
                        if(r.r == 0) {
                            change.probe_edit(o.id,  probe_label(o), 2);
                            it.replaceWith(m(o))
                            serr.remove();
                            sub.unlockList(); 
                            lb.destroy();
                        } else {
                            it.replaceWith(m(o));
                            serr.show();
                        }
                    });
                }
            };
        }
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.probeList .item', 
            callback:function(key, options) {
                _this.onChange();
                j();
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'adds':
                        as(this.o, this.it);
                        break;
                }
            },
            items:{
                'remove':{name:polyglot.t('main.rem'), icon:'delete'},
                'rename':{name:polyglot.t('main.ren'), icon:'edit'},
                'adds':{name:polyglot.t('probe.adds'), icon:'add'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    visibility_init(sub, $('#topbar .ui.visibility.dropdown'), function(i) { return i == 2 ? sub.pane_v(1) : sub.pane(i - (i > 2)); });
    
    (function(){
        $('#uses').css('display', 'none');
        
        var _ctx = {};
        var _sizes = [20, 60, 20];
        var _panes = ['#left', '#center', '#uses'];
        
        var _ctx_v = {dir:'vertical'};
        var _sizes_v = [60, 40];
        var _panes_v = ['#center_top', '#center_bottom'];
        
        sub.pane = function(i) {
            return _panes[i];
        };
        
        sub.pane_v = function(i) {
            return _panes_v[i];
        }
        
        sub.split = function() {
            doSplit(_panes, _sizes, _ctx, ['#left', '#uses']);
            doSplit(_panes_v, _sizes_v, _ctx_v);
        };
        
        sub.split();
    })();

    (function() {
        var u = $('#uses');
        var l = $('.usesList');
        var p = $('.usesPage');
        var n = {page:'main/probe',
                 sub:'probe',
                 pg:'sub.requestUses(p)',
                 kd:'sub.requestUses(parseInt(this.value)-1, event)'
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            },l, p, n, n.po, d);
        }
        
        sub.clearUses = function() {
            clear_visible_split(u);
            paging_reset(n);
            p.html('');
            l.html('<div class="list_e">' + polyglot.t('probe.noprobe') + '</div>');
        }
        
        sub.resetUses = function() {
            paging_reset(n);
            sub.requestUses();
        }
        
        var s = list_search(uFilter, sub.resetUses);
        
        var ru = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function() {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i,id:sel}));
                    uFilter.attr('disabled', '');
                    l.addClass('nomouse_i');
                    p.addClass('nomouse');
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:45}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        uFilter.attr('disabled', null);
                        l.removeClass('nomouse_i');
                        p.removeClass('nomouse');
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        sub.requestUses = function(po, ev) {
            do_visible_split(u, function() {
                ru(po, ev)
            });
        }
    })();
    
    sub.requestProbes();

 });addTmpl("main/code", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sgrid\"><div id=\"left\" class=\"ui segment\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.htree",{"name":"l","hash":{},"data":data}))
    + "\n            </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><ul id=\"fileTree\" class=\"ztree\"></ul><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw\"><label for=\"fileFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_ff",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"fileFilter\" name=\"fileFilter\" class=\"prompt search\" type=\"text\" placeholder=\""
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_ff",{"name":"l","hash":{},"data":data}))
    + "\"><i class=\"search icon\"></i></div></div></div></div><div id=\"center\" class=\"ui segment\"><div id=\"editLabel\" class=\"ui top attached blue label tov\"></div><div id=\"editor\" class=\"grid_c hide editor\"></div><div class=\"grid_e\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.nofile",{"name":"l","hash":{},"data":data}))
    + "</div></div><div id=\"search\"><div class=\"ui segment fullw paging_outer\" style=\"height: calc(100% - 4.16rem);\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.vsearch",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"codeFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"codeFilter\" name=\"codeFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist codeList paging_inner content\"></div></div><div class=\"ui codesel dropdown item\" style=\"display:block;width:14.4rem;\"><div class=\"menu\" style=\"width:100%;\"><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.view_l2a",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div class=\"ui menu\" style=\"margin-bottom:0.22rem;\"><a class=\"ui codebtn dropdown item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/code'),sub=ctx['code'],f=function(event) {ctx.codeSel();};f.call(t, event)})()\"><div class=\"text\"></div><i class=\"dropdown icon\"></i></a></div><div class=\"ui pagination menu codePage fullw\"></div></div><div id=\"right\" class=\"ui segment\"><div class=\"ui top attached blue label tov\">\n            "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.hdiss",{"name":"l","hash":{},"data":data}))
    + "\n        </div><div></div><div class=\"content\" style=\"height: calc(100% - 35px);\"></div></div></div>";
},"useData":true},"");addA("main/code","code",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
        sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addTmpl("main/code", "topbar",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui open dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.file",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/code'),sub=ctx[''],f=function(event) {ctx.fileOpen();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.open",{"name":"l","hash":{},"data":data}))
    + "\n            </div><div class=\"item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/code'),sub=ctx[''],f=function(event) {ctx.fileDrop();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div></div><div class=\"ui visibility dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.vis",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vtree\" id=\"vtree\" checked=\"\"><label for=\"vtree\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.vtree",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vedit\" id=\"vedit\" checked=\"\"><label for=\"vedit\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.vedit",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vsearch\" id=\"vsearch\"><label for=\"vsearch\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.vsearch",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vdiss\" id=\"vdiss\" checked=\"\"><label for=\"vdiss\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.vdiss",{"name":"l","hash":{},"data":data}))
    + "</label></div></div></div></div>";
},"useData":true},"");addTmpl("main/code", "modal",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui modal fileOpen\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.open",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"content\" style=\"padding-bottom:0;position:relative;\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.open_d",{"name":"l","hash":{},"data":data}))
    + "</p><div style=\"float:left;width:calc(70% - 10px);margin-right:10px;padding: 0 20px 20px 0;border-right: 1px solid #d9dadb;\"><div class=\"lower\"><div style=\"width: calc(100% - 3 * 50px);display:inline-block;\"><div class=\"ui input icon fl-wrap fullw\"><i class=\"icon\"></i><label for=\"openPath\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.open_p",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"openPath\" name=\"openPath\" type=\"text\"></div></div><button id=\"openReloadBtn\" class=\"ui blue icon button ibtn\"><i class=\"caret redo icon\"></i></button><button id=\"openUpBtn\" class=\"ui blue icon button ibtn\"><i class=\"caret up icon\"></i></button><button id=\"openPathBtn\" class=\"ui blue icon button ibtn\"><i class=\"caret right icon\"></i></button></div><div class=\"ui segment fileBox\"><div class=\"ov\"><ul id=\"theFiles\" class=\"files\" style=\"float:clear;\"></ul></div><div id=\"theStatus\"></div></div></div><div style=\"float:right;width:30%;\" class=\"fl-form fl-style-1\"><div class=\"fullw fl-wrap fl-wrap-input upper\"><label class=\"fl-label\" style=\"z-index: 13;\" for=\"openDef\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.open_sp",{"name":"l","hash":{},"data":data}))
    + "</label><div class=\"ui search selection dropdown activeselect fullw\" style=\"margin-bottom:10px;\"><input type=\"hidden\" name=\"openDef\" id=\"openDef\" value=\"\" autofocus=\"true\"><i class=\"dropdown icon\"></i><div class=\"default text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.open_sp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"menu\" style=\"overflow-y:auto;max-height:15rem;\"></div></div></div><div class=\"ui checkbox\"><input type=\"checkbox\" id=\"openClear\" name=\"openClear\"><label>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.open_c",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"doclear\"></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue right accept labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/code'),sub=ctx['code_file_open'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div><div class=\"ui modal fileDrop\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"dropLeft\"><div class=\"ui segment\"><ul id=\"dirTree\" class=\"ztree\"></ul></div></div><div class=\"dropRight\"><div><div class=\"ui icon input fl-wrap\"><i class=\"search icon\"></i><label for=\"dirFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_fd",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"dirFilter\" name=\"dirFilter\" class=\"prompt\" type=\"text\" placeholder=\""
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_fd",{"name":"l","hash":{},"data":data}))
    + "\"></div></div><form id=\"dropFrm\"><input id=\"fileDrop\" type=\"file\" class=\"hide\" webkitdirectory=\"\" multiple=\"\"></form><div class=\"dirDrop\" onclick=\"var t = this;(function(){var ctx=getCtx('main/code'),sub=ctx['code_file_drop'],f=function(event) {sub.onOpenDir();};f.call(t, event)})()\"><div class=\"label\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_t",{"name":"l","hash":{},"data":data}))
    + "</div></div><div><div class=\"ui icon input fl-wrap\"><i class=\"filter icon\"></i><label for=\"extFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_ext",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"extFilter\" name=\"extFilter\" class=\"prompt\" type=\"text\" placeholder=\""
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"code.drop_ext",{"name":"l","hash":{},"data":data}))
    + "\"></div></div></div><div class=\"doclear\"></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/code'),sub=ctx['code_file_drop'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div>";
},"useData":true},"");addA("main/code","code_file_drop",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.fileDrop', {'style':1, customEvent:autofill});
     });addS("main/code", "_sid7","\n    .dropLeft {\n        width:60%;\n        height:200px;\n        float:left;\n    }  \n    .dropLeft .ui.segment {\n        padding:5px;\n        height: 100%;\n        overflow: auto;\n    }\n    .dropRight {\n        width:calc(40% - 1rem);\n        height:200px;    \n        float:right;\n        margin-left:1rem;\n    }\n    .dirDrop {\n        border:2px dashed #ccc;\n        border-radius: 0.28571429rem;\n        line-height:5.8rem;\n        margin-top:10px;\n        margin-bottom:10px;\n        text-align:center;\n        cursor:pointer;\n    }\n    .dirDrop .label {\n        display:inline-block;\n        vertical-align:middle;\n        font-weight:bold;\n        line-height:1.5rem;\n        margin-top:-1rem;\n    }\n    \n    .dropRight .input,\n    .dropRight input {\n        width:100%;\n    }\n    \n    .zTreeDragUL {\n        z-index:9999;\n    }\n    \n    .tmpzTreeMove_arrow {\n        z-index:9999;\n    }\n");addJ("main/code","code_file_drop",function(ctx, path, sub) { 

    var _canClose = true;
    var _modal = $('.ui.modal.fileDrop');
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity: 0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                        
                
    var tree;        
    var setting = { callback:{
                        beforeClick:function(id, n){
                            return n.c !== undefined;
                        },
                        beforeDrag: beforeDrag,
				        beforeDrop: beforeDrop,
				        beforeRename:function(treeId, treeNode, newName) {
				            var p = treeNode.getParentNode();
				            return p.c.every(function(n) {
				                return n == treeNode || n.n !== newName;
				            });
				        }
                    }, 
                    view:{
                        selectedMulti:false
                    },
                    data:{
                        key:{
                            name:'n',
                            children:'c',
                            isParent: 'p'
                        },
                        keep:{
                            leaf:true,
                            parent:true
                        }
                    },
                    edit : {
                        drag : {
                            autoExpandTrigger : true,
                            isCopy : false,
                            isMove : true,
                            prev : true,
                            next : true,
                            inner : true,
                            borderMax : 10,
                            borderMin : -5,
                            minMoveSize : 5,
                            maxShowNodeNum : 5,
                            autoOpenTime : 500
                        },
                        editNameSelectAll : false,
                        enable : true,
                        showRemoveBtn : false,
                        showRenameBtn : false
                    }};
    var nodes;
    var fileDrop = $('#fileDrop');
    var dropFrm = $('#dropFrm');
    var dirFilter = $('#dirFilter');
    var extFilter = $('#extFilter');
    var dirTree = $('#dirTree');
    var _filter = -1;
    var filterNodes = function() {};
    
    fileDrop.on('change', function(e) {
        doDrop(fileDrop[0].files);
        dropFrm[0].reset();
    });
    
    fileDrop.on('click', function(e) {
		document.body.onfocus = function() {
		    if(fileDrop[0].value.length == 0) {
		        endDrop();
		    }
		    document.body.onfocus = null;
		};
    });
    
    dirFilter.on('input', function(e) {
        clearTimeout(_filter);
        _filter = setTimeout(filterNodes, 1000);
    })
    
    
    sub.onOpen = function(after) {
        sub.after = after;
        nodes = ctx.getDirs();
        tree = $.fn.zTree.init(dirTree, setting, nodes);
        var root = tree.getNodes()[0];
        clearFilter();
        extFilter.val(null);
        
        tree.selectNode(root);
        tree.expandAll(false);
        domy.defer(function() {
            tree.expandNode(tree.getNodes()[0], true);
        });
        
        filterNodes = function () {
            _filter = -1;
            var v = dirFilter.val()
            tree.showNodes(_hiddenNodes);
            if(v) {
                tree.setEditable(false);
                var l = tree.getNodesByParamFuzzy('n', v);
                var n = [];
                collectHide(n, tree.getNodes()[0], l);
                
                tree.hideNodes(n);
                _hiddenNodes = n;
                tree.expandAll(true);
            } else {
                tree.setEditable(true);
                _hiddenNodes = [];
            }
            fixSelect();
        }
    }
        
    sub.onOpenDir = function() {
        beginDrop();
        fileDrop.click();
    }
        
    sub.onOk = function() {
        clearFilter();
        tree.expandAll(false);
        ctx.setDirs(tree.getNodes());
        _modal.modal('hide');
        sub.after({});
    }
    
    var dirDrop = $('.dirDrop');
    
    function doDrop(items) {
        beginDrop();
        var r = tree.getSelectedNodes()[0];
        var ext = extFilter.val();
        var isMatch = ext ? picomatch(ext) : null;
    	var onFile = isMatch ? function(file, path, type) {
    	    if(isMatch(file.name)) {
    	        addNode(r, path, file);
    	    }
    	} : function(file, path, type) {
    	    addNode(r, path, file);
    	}
    	parseFileList({}, items, onFile, function() {
            tree.expandNode(tree.getNodes()[0], true);
            endDrop();
    	});
    }
    
    function beginDrop() {
        var b = _modal.find('.ui.button');
        $(b[1]).addClass('loading');
        $(b[0]).addClass('disabled');
        $(b[1]).addClass('disabled');
        _canClose = false;
    }
    
    function endDrop() {
        var b = _modal.find('.ui.button');
        $(b[1]).removeClass('loading');
        $(b[0]).removeClass('disabled');
        $(b[1]).removeClass('disabled');
        _canClose = true;
    }
    
    dirDrop[0].ondrop = function(e) {
        e.preventDefault();  
        if(!e.dataTransfer) {
            return false;
        }
        
        var items;
        if ((items = e.dataTransfer.items)) {
        } else 
        if((items = e.dataTransfer.files)){
        } else {
            return false;
        }
        
		doDrop(items);
    }
    
    dirDrop[0].ondragover = function(e) {
        e.preventDefault();
    }
                
	function parseFileList(info, list, cb, after) {
		var l = [];
		for(var i = 0, len = list.length; i < len; i++) {
			if(list[i].webkitGetAsEntry && list[i].kind=='file') {
				var item = list[i].webkitGetAsEntry();
				if(item)
					l.push(parseFiles(info, item, null, cb));
			} else if(list[i].webkitRelativePath) {
				l.push(parseFiles(info, list[i], list[i].webkitRelativePath, cb));
			}
		}	
		$.when.apply($, l).then(function() {
			after();
		});
	}

	function parseFiles(info, item, path, cb) {
	    if(info.error || info.cancel)
	        return;
		path = path || '';
		var d = $.Deferred();
		if(item.isFile) {
			item.file(function(file) {
				cb(file, path + file.name, 1);
				d.resolve();
			}, function(){
			    info.error = true;
			});
		} else 
		if(item.isDirectory) {
			var rd = item.createReader();
			rd.readEntries(function(items, a) {
				if(items.length == 0) {
					cb(item, path, 0);
					d.resolve();
				} else {
					var l = [];
					for(var i = 0, len = items.length; i< len; i++)
			        	l.push(parseFiles(info, items[i], path + item.name + '/', cb));	
			        	
    				$.when.apply($, l).then(function() {
						d.resolve();
    				});
				}
			}, function(){
			    info.error = true;
			});
		} else {
			cb(item, path, 1);
			d.resolve();
		}
	    return d;
	}

    $.contextMenu({
        zIndex: 103,
        selector:'.dropLeft', 
        callback:function(key, options) {
            switch(key) {
                case 'add':
                    addDir();
                    break;
            }
        },
        items:{
            'add':{name:polyglot.t('code.ndir'), icon:'add'},
        },
        events:{
            show :function(options){
            }
        }
    });
    
    var _opt;
    function disabled(key, opt) {
        if(_opt > 0) {
            return (_opt != 1 || key != 'add_dir') && (key != 'remove' || _opt == 1);
        } else {
            return false;
        }
    }
    
    function fixSelect() {
        var s = tree.getSelectedNodes();
        if(s.length == 0) {
            tree.selectNode(tree.getNodes()[0]);
        }
    }
    
    $.contextMenu({
        zIndex: 103,
        selector:'#dirTree a', 
        callback:function(key, options) {
            switch(key) {
                case 'add_dir':
                    addDir();
                    break;
                case 'remove':
                    var n = tree.getNodeByTId(this[0].parentNode.id);
                    tree.removeNode(n);
                    fixSelect();
                    break;
                case 'rename':
                    var n = tree.getNodeByTId(this[0].parentNode.id);
                    tree.editName(n);
                    break;
            }
        },
    
        items:{
            'add_dir':{name:polyglot.t('code.ndir'), icon:'add', disabled:disabled},
            'remove':{name:polyglot.t('main.del'), icon:'remove', disabled:disabled},
            'rename':{name:polyglot.t('main.ren'), icon:'edit', disabled:disabled},
        },
        events:{
            show :function(options){
                var n = tree.getNodeByTId(this[0].parentNode.id);
                var leaf = n.c === undefined;
                _opt = leaf ? 2 : 0;
                _opt += n.level == 0;
                if(!leaf) {
                    tree.selectNode(n);
                }
            }
        }
    });
    
    var _hiddenNodes = [];
    
    function findNode(root, p){
        var r = root;
        var idx = 0;
        var v = p.every(function(n, i) {
            var c = tree.getNodeByParam("n", n, r);
            if(!c) {
                idx = i;
                return false;
            }
            r = c;
            return true;
        });
        if(v) {
            idx = p.length - 1;
        }
        return {i:idx,r:r,v:v};
    }
    
    function addDir() {
        clearFilter();
        var r = tree.getSelectedNodes()[0];
        var nn = {n:polyglot.t('code.new_dir'),c:[],p:true};
        var n = tree.addNodes(r, nn, true)[0];
        if(n) {
            tree.editName(n);
        }
    }
    
    function addNode(root, p, f) {
        p = p.split('/');
        var n = findNode(root, p);
        var r = n.r;
        if(r.c === undefined) {
            return null;
        }
        if(!n.v) {
            var prev = null;
            var root = null;
            var nn;
            for(var i = n.i; i < p.length; i++) {
                nn = {n:p[i]};
                if(prev) {
                    prev.c = [nn];
                    prev.p = true;
                } else {
                    root = nn;
                }
                prev = nn;
            }
            f._noclone = true;
            nn.file = f;
            r = tree.addNodes(r, root, true)[0];
        } else {
            f._noclone = true;
            r.file = f;
        }
        
        return r;
    }
    
    function clearFilter() {
        clearTimeout(_filter);
        dirFilter.val(null);
        tree.showNodes(_hiddenNodes);
        _hiddenNodes = [];
        _filter = -1;
    }
    
    function collectHide(r, n, l) {
        if(n.c !== undefined) {
            var h = true;
            n.c.forEach(function(m) {
                h &= collectHide(r, m, l);
            });
            if(h && l.indexOf(n) == -1 && n.level != 0) {
                r.push(n);
                return true;
            }
        } else {
            r.push(n);
            return true;
        }
        return false;
    }
    
    function sortNodesByName(items) {
        return items.slice(0).sort(function(a,b) {
            return (a['n'] > b['n']) ? 1 :(a['n'] < b['n']) ? -1 :0;
        });
    }
    
	function beforeDrag(treeId, treeNodes) {
		return treeNodes != 0;
	}
	
	function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		return targetNode != null && (targetNode.level != 0 || moveType == 'inner');
	}
 });addA("main/code","code_file_open",function(ctx, path, sub, load) { 
            if(sub.lb) {
                sub.lb.destroy();
            }
    	    sub.lb = new FloatLabels('.ui.modal.fileOpen .lower', {'style':1, customEvent:autofill});
         });addS("main/code", "_sid6","\n    .fileBox {\n        margin-top:10px !important;\n        padding: 0px !important;\n        border:1px solid #ddd;\n        border-radius:4px;\n    }\n            \n    .ov {   \n        overflow-y:hidden;\n        height:100%;\n        height:100%;\n        width:100%;\n    }\n    \n    .files {        \n        width: 197px;\n        height: 620px;\n        padding: 0;\n        margin: 0;\n        list-style-type:none;\n        -webkit-transform:rotate(-90deg) translateX(-200px);\n        -ms-transform:rotate(-90deg) translateX(-200px);\n        -webkit-transform:rotate(-90deg) translateX(-200px);\n        transform:rotate(-90deg) translateX(-200px);\n        -webkit-transform-origin:0 0;\n        -moz-transform-origin:0 0;\n        -ms-transform-origin:0 0;\n        -o-transform-origin:0 0;\n        transform-origin:0 0;\n    }\n    \n    .files li {        \n        width: 15px;\n        height: 220px;\n        float:right;\n        margin:5px;\n        -webkit-transform:rotate(90deg) translateY(-15px);\n        -ms-transform:rotate(90deg) translateY(-15px);\n        -webkit-transform:rotate(90deg) translateY(-15px);\n        transform:rotate(90deg) translateY(-15px);\n        -webkit-transform-origin:0 0;\n        -moz-transform-origin:0 0;\n        -ms-transform-origin:0 0;\n        -o-transform-origin:0 0;\n        transform-origin:0 0;\n    }\n    \n    .files li a {    \n        color: #000;\n        width: 220px;\n        height: 26px;\n        cursor: pointer;\n        display: inline-block;\n        line-height: 25px;\n    }   \n    \n    .files li a:hover { \n        background:#3E93D8;\n        color:#FFF;\n    }\n    \n    .files li div {     \n        width: 199px;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        direction: rtl;\n        display: inline-block;\n        vertical-align: text-bottom;\n    }\n    \n    .files .sel a { \n        background:#54a3e1;\n        color:#FFF;\n    }\n    \n    #theStatus {\n        float:right;   \n        height:1.2rem;\n        line-height: 2.2rem;\n    }\n    \n    .__any:before {\n        content:url('./img/page_white.png');\n        width:16px;\n        height:16px;\n        margin-right:5px;\n        vertical-align: baseline;\n    }\n    \n    .___d:before {\n        content:url('./img/dir.png');\n    }\n    \n\n    .__prot:before {\n        background:rgb(222, 170, 170);\n        background:rgba(222, 170, 170, 0.35);\n        border-radius:2px;\n    }\n    \n    .__php:before {\n        content:url('./img/page_white_php.png');\n    }\n    \n    .__pdf:before {\n        content:url('./img/page_white_acrobat.png');\n    }\n    \n    .ibtn {\n        float:right;\n    }\n    \n    .iclr {    \n        cursor: pointer !important;\n        pointer-events: initial !important;\n    }\n");addJ("main/code","code_file_open",function(ctx, path, sub) { 
    var _canClose = true;
    var filesCache = {};
    var selFiles = [];
    var selDelay = 600;
    var selCls = 'sel';
    var selDelay = 600;
    var selLast, selDiff;
    var _upper = $('.ui.modal.fileOpen .upper');
    var _openPath = $('#openPath');
    var openPathBtn = $('#openPathBtn');
    var openReloadBtn = $('#openReloadBtn');
    var openUpBtn = $('#openUpBtn');
    var openClear = $('#openClear')
    var openPathIcon = _openPath.parents('.ui.input').find('.icon');
    var fileBox = $('.fileBox');
    var m = $('.ui.modal.fileOpen');
    var sts = $('#theStatus');
    var theFiles = $('#theFiles');
    var files = $('.files');
    var openAcceptBtn = m.find('.ui.accept');
    var activeTasks = {};
    var in_path = false;
    var probeId;
    
    var ct = m.find('.content');
    var loader = loader_init(ct);
    var serr = error_init(ct, polyglot.t('code.eh_diss'), polyglot.t('code.e_diss'));
    
    sub.m = m;
    
    function task_add(t) {
        activeTasks[t] = true;
    }
    
    function task_remove(t) {
        delete activeTasks[t];
    }
    
    function task_kill() {
        $.each(activeTasks, function(k, v) {
            window.request_kill(k);
        });
        activeTasks = {};
    }
    
    fileBox[0].style = 'height:' + (200 + window.sbh()) + 'px;';
    
    sub.probeChange = function(e, probes) {
        probes_reset();
    }
    
    $(document).on('probeChange', sub.probeChange);
    
    m.modal({detachable:false,
             autofocus: false,
                                     dimmerSettings:{
                                          useCSS   : true,
                            opacity: 0.5
                                     },
                                     onShow:onShowModal,
                                     onHide:function() {
                                        if(_canClose) {
                                            onHideModal();
                                            return true;
                                        } 
                                         
                                        $('body').dimmer('show');
                                        return false;
                                    },
                                    onDeny:function(){
                                        return _canClose;
                                    },
                                     onVisible:onVisibleModal,
                                     onHidden:onHiddenModal
                                    });
                               
    var dropDown = m.find('.ui.dropdown');    
    var dropSettings = {
        forceSelection: false,
        selectOnKeydown: false,
        clearable: true,
        onChange:function(value, text, $choice){
            view_reset();
            if(value) {
                _upper.addClass('fl-is-active');
                path_active(true);
                dropDown.find('input').blur();
            } else {
                _upper.removeClass('fl-is-active');
            }
        }
    };
    dropDown.dropdown(dropSettings);
    
    var _pathPending = false;
    
    function path_remove_pending() {
        if(_pathPending) {
            openPathIcon.removeClass('clear');
            openPathIcon.removeClass('iclr');
        }
    }
    
    openPathIcon.on('click', function() {
        if(_pathPending) {
            path_load(_path);
        }
    });
    
    function go() {
        var v = _openPath.val();
        if(_pathPending && v) {
            path_load(v);
        }
    }
    
    openPathBtn.on('click', function() {
        go();
    });
    
    openUpBtn.on('click', function() {
        if(in_path) {
            var p = _path;
            if(p[p.length - 1] == '/') {
                p = p.slice(0, -1);
            }
            var i = p.lastIndexOf('/');
            if(i != -1) {
                p = p.substr(0, i);
                if(p == '')
                    p = '/';
                path_load(p);
            }
        }
    });
    
    openReloadBtn.on('click', function() {
        var v = _openPath.val();
        if(v) {
            if(in_path) {
                delete filesCache[canoPath(v, '_')];
            }
            
            path_load(v);
        }
    });
    
    _openPath.on('keydown', function(e) {
        if(e.keyCode == 13) {
            go();
        }
    });
    
    _openPath.on('input', function(e) {
        if(!_pathPending) {
           _pathPending = true;
            path_button_active(true);
            path_up_button_active(false);
            openPathIcon.addClass('clear');
            openPathIcon.addClass('iclr');
           // TODO add clear button
        }
    });
    
    function path_set(v) {
        path_remove_pending();
        _pathPending = false;
        _path = v;
        path_button_active(false);
        path_up_button_active(true);
        label_set(_openPath, v);
    }
    
    function request_prepare(o) {
        var s = dropDown.dropdown('get value');
        var i = dropDown.dropdown('get item');
        var sock = parseInt(i.attr('socket'));
        var pr = probes_get(sock)
        var pi = {id:pr.id, s:sock};
        o.p = pi;
        if(!i[0].hasAttribute('empty')) {
            pi.idn = s;
        }
        return pr;
    }
        
    function path_load(p) {
        task_kill();
        var items = filesCache[canoPath(p, '_')];
        if(items) {
            in_path = true;
            path_set(p);
            setupFileView(items, undefined, true);
            return;
        } else {
            in_path = false;
        }
        
        state_set_load();
        
        var first = true;
        var o = {
            onResult:function(d) {
                var c = first;
                if(first) {
                    in_path = d.f || false;
                    first = false;
                }
                
                setupFileView_append(d.d || [], in_path ? p : undefined, c);
                
                if(d.r !== undefined) {
                    var f = theFiles.parent();
                    f[0].scrollLeft = 0;
                    
                    task_remove(this.t);
                    if(in_path) {
                        path_set(p);
                    }
                }
            },
            onError:function(d) {
                task_remove(this.t);
                console.log('onError', d);
                console.log('ticket error');
            }
        };
        var pr = request_prepare(o);
        var d = {t:1, data:JSON.stringify(p).slice(1,-1), p:o.p, x:pr.t};
        if(request(d, o)) {
            task_add(o.t);
        }
    }
    
    function path_button_active(v) {
        if(v) {
            openPathBtn.removeClass('disabled');
            openUpBtn.removeClass('disabled');
        } else {
            openPathBtn.addClass('disabled');
            openUpBtn.addClass('disabled');
        }
    }
    
    function path_up_button_active(v) {
        if(v) {
            openUpBtn.removeClass('disabled');
        } else {
            openUpBtn.addClass('disabled');
        }
    }
    
    function path_active(v) {
        var openPath = _openPath.parents('.ui.input');
        if(v) {
            openPath.removeClass('disabled');
            path_load('/');
        } else {
            openPath.addClass('disabled');
        }
    }
    
    function view_reset() {
        task_kill();
        filesCache = {};
        selFiles = [];
        setupFileView([], undefined, true);
        check();
        path_set(null);
        path_active(false);
        path_button_active(false);
        path_up_button_active(false);
    }
    
    function probes_reset() {
        var s = dropDown.dropdown('get value');
        var m = dropDown.find('.menu');
        var f = $(document.createDocumentFragment());
        probes_each(function(k, v) {
            var l = probe_label(v);
            var e = '';
            if(!probe_has_label(v)) {
                e = 'empty';
            }
            f.append('<div class="item" socket="' + k + '"' + e + '>' + l + '</div>');     
        });
        m.html('');
        m.append(f);
        dropDown.dropdown('restore defaults')
				.dropdown('destroy')
				.dropdown('setting', dropSettings);
		if(s) {
            dropDown.dropdown('set selected', s);
            if(dropDown.dropdown('get value') != s) {
                view_reset();
            }
		}
    }
    
    sub.onOpen = function(after) {
        sub.after = after;
        serr.hide();
        view_reset();
        dropDown.dropdown('clear');
        openClear.prop('checked', false);
    }
    
    var input = dropDown.find('input.search');
    input.on('focus', function(e) {
        _upper.addClass('fl-has-focus');
    });
    input.on('blur', function(e) {
        _upper.removeClass('fl-has-focus');
    });
    input.on('input', function(e) {
        if(input.val()) {
            _upper.addClass('fl-is-active');
        } else if(!dropDown.dropdown('get value')) {
            _upper.removeClass('fl-is-active');
        }
    });
    
    function confirm(v) {
        if(v === undefined) {
            v = getPath(selFiles[0]);
        }
        
        var parse = function(d) {
            var x = d.split(',');
            return {a:parseInt(x[0]), b:parseInt(x[1])};
        };
        
        var pr;
        var p = _path;
        var o = {
            onResult:function(d) {
                task_remove(this.t);
                loader.hide();
                _canClose = true;
                sub.m.modal('hide');
                sub.after({pid:probeId, d:parse(d.d), v:v, p:p, pr:pr});
            },
            onError:function(d) {
                task_remove(this.t);
                loader.hide();
                _canClose = true;
                if(d && d.r == 17 && d.d && d.d.indexOf(',') != -1) {
                    sub.m.modal('hide');
                    sub.after({pid:probeId, d:parse(d.d), v:v, p:p, pr:pr});
                } else {
                    serr.show();
                }
                console.log('onError', d);
                console.log('ticket error');
            },
            sub:sub
        };
        pr = request_prepare(o);
        var c = openClear.is(':checked') ? 1 : 0;
        var m = {p:v, c:c, k:login_current().r};
        var d = {t:4, p:o.p, x:pr.t};
        probeId = o.p.id;
        if(request(d, o, m)) {
            _canClose = false;
            loader.show();
            task_add(o.t);
        } else {
            serr.show();
        }
    }
    
    sub.onOk = function() {
        if(selFiles.length == 1 && !isDir(selFiles[0])) {
            confirm();
        }
    }
    
    function setupFileView_append(items, path, clear) {
        if(path !== undefined) {
            var c = canoPath(path, '_');
            var o = filesCache[c] || [];
            items = filesCache[c] = o.concat(items);
        }
        _setupFileView(items, path, clear);
    }
    
    function setupFileView(items, path, clear) {
        if(path !== undefined) {
            filesCache[canoPath(path, '_')] = clear ? null : items;
        }
        _setupFileView(items, path, clear);
    }
    function _setupFileView(items, path, clear) {
        hideAll();
        theFiles.html('');
        items = sortNodesByName(items);
        var f = $(document.createDocumentFragment());
        for(var i = 0, l = items.length; i < l; i++) {
            var li = document.createElement('li');
            setupFileItem(li, items[i]);
            f.append(li);
        }
        var div = document.createElement('li');
        div.style = 'clear:both;float:right;pointer-events:none;margin-top:-18px;';
        f.append(div);
        fileData = items;
        
        theFiles.append(f);
        
        var items = files.find('li');
    
        onMouseUp = function(e, li) {
            selDiff = e.timeStamp - selLast;
            if(selDiff < selDelay) {
                if(e.ctrlKey) {
                    $(li).toggleClass(selCls);
                    onFileSelect(files.find('.' + selCls));
                } else {
                    files.find('.' + selCls).each(function() {
                        $(this).removeClass(selCls);
                    })
                    $(li).toggleClass(selCls);
                    onFileSelect([li]);
                }
            }
        }
        
        items.bind('mousedown mouseup', function(e) {
            e.preventDefault(); 
            if(e.type == 'mousedown') {
                targetFile = true;
                selLast = e.timeStamp;
            } else {
                onMouseUp(e, this);
            }
        });
        
        items.bind('dblclick', function(e) {
            e.stopPropagation(); 
            e.preventDefault();
            doOpenFile(this);
        })
        
        onFileSelect([]);
    }
    
    function setupFileItem(li, item) {
        var p = in_path ? getBaseName(item.p) : item.p;
        var ext = getFileExt(p, item.c);
        var cls = ' class="__any' + (ext ? ' __' + ext :'') + (item.r ? '' :' __prot') + '"';
        li.innerHTML = '<a' + 
                                (p.length > 22 ? ' title="' + item.p + '"' : '') + 
                                ' tabindex="-1" ' + (item.s !== undefined ? 's="' + item.s + '" ' : '')
                                + 'p="' + item.p + '"' + cls + '><div>&lrm;<span>' + p + '</span></div></a>';
    }
    
    function hideAll(v) {
        
    }
    
    function check() {
        if(selFiles.length == 1 && !isDir(selFiles[0])) {
            openAcceptBtn.removeClass('disabled');
        } else {
            openAcceptBtn.addClass('disabled');
        }
    }
    
    function onFileSelect(items) {
        selFiles = items;
        doUpdateState(items);
        check();
    }

    function sortNodesByName(items) {
        return items.slice(0).sort(function(a,b) {
            return a['p'].localeCompare(b['p'], undefined, {sensitivity: 'base'});
        });
    }
            
    function canoPath(path, prefix) {
        if(path)
        {
        	if(path[path.length - 1] == '/')
        	    path = path.substr(0, path.length - 1);
        	return prefix + path;
        }
        return prefix;
    }
           
    function getBaseName(name) {
        var idx;
        if((idx = name.lastIndexOf('/')) != -1) {
            return name.substr(idx+1);
        }
        return name;
    }
    
    function getFileExt(name, dir) {
        var idx;
        if(dir) {
            return '_d';
        }
        if((idx = name.lastIndexOf('.')) != -1) {
            return name.substr(idx + 1).toLowerCase();
        }
        return null;
    }
            
    function isSelected(li) {
        return selFiles.index ? selFiles.index(li) != -1 :selFiles.indexOf(li) != -1;
    }
    
    function getPath(li) {
        var a = li.children[0];
        return a.getAttribute('p');
    }
    
    function getName(li) {
        var a = li.children[0];
        return getBaseName(a.innerText);
    }
    
    function isDir(li) {
        var a = li.children[0];
        return !a.hasAttribute('s');
    }
    
    function getSize(li) {
        var a = li.children[0];
        if(!a.hasAttribute('s'))
            return undefined;
        return parseInt(a.getAttribute('s'))
    }
    
	function fixFile(s) {
        return encodeURI(s).replace(/%5B/g, '[').replace(/%5D/g, ']');
    }
           
    function doOpenFile(li) {
        var d = isDir(li)
        var p = getPath(li);
        if(d) {
            path_load(p);
        } else {
            confirm(p);
        }
    }
            
    function formatSize(size) {
        if(size < 1024)
            return size + ' B';
        else
        if(size < 1024 * 1024)
            return (size / 1024).toFixed(1) + ' KiB';
        else
        if(size < 1024 * 1024 * 1024)
            return (size / (1024 * 1024)).toFixed(1) + ' MiB';
        return (size / (1024 * 1024 * 1024)).toFixed(1) + ' GiB';
    }
            
    function doUpdateState(items) {
        var count = fileData.length;
        var state = '';
        
        var focus = function() {
            if(items.length != 0) {
                items[items.length - 1].firstChild.focus();
            }
        }
        
        if(items.length == 0) {
            state += polyglot.t('code.open_f', {smart_count:count});
        } else
        if(items.length == 1) {
            var d = getSize(items[0]);
            var n = getName(items[0]);
            if(n.length > 20) {
                n =  '...' + n.substr(n.length - 20);
            }
            sts[0].innerHTML = n + (d !== undefined ? ' (' + formatSize(d) + ')' : '');
            focus();
            return;
        } else {
            state += polyglot.t('code.open_s', {smart_count:items.length, count:count});
        }
        
        focus();
        sts[0].innerHTML = state;
    }
    
    function state_set_load() {
        sts[0].innerHTML = polyglot.t('main.load')  + '<div class="ui mini text active inline loader" style="margin-top: 18%;margin-left: 6px;"></div>'
    } 
    
    probes_reset();
    
    $(document).one('cacheDestroy', function() {
        $(document).off('probeChange', sub.probeChange);
    });
 });addS("main/code", "_sid5","\n\n#left {\n    overflow: visible;\n}\n\n.nodeDir {\n    \n}\n\n#fileTree {\n    overflow: hidden;\n    height: calc(100% - 2rem);\n}\n\n#fileTree > li {\n    overflow:auto;\n    height:100%;\n    padding:5px;\n}\n\n#fileTree {\n    padding:0;\n}\n\n#right .vlist_ct {\n    overflow:auto;    \n    overflow-x: scroll;\n    position:relative;\n    padding:10px;\n    margin:0;    \n    height:100%;\n}\n\n#right .vlist_sc {\n    position:relative;\n    width:1px;\n}\n\n#right .vlist_hd {\n    position:absolute;\n    top:0;\n    width:calc(100% - 20px);\n}\n\n#right .vlist_it {\n    height:35px;\n    line-height: 35px;\n    width:100%;    \n    vertical-align: middle;\n}\n\n#right .vlist_it.removed {\n    display:none;\n}\n\n#right .vlist_it pre {\n    margin:0;\n}\n\n\n#search .ui.menu {\n    min-height:1.857143em;\n    margin: 0;\n    overflow:hidden;\n}\n\n#search .ui.menu .item {\n    padding:0.2rem 1rem 0.2rem 1rem;\n}\n\n#search .menu > .item:before {\n    background-color: #dedede;\n}\n\n#search .codebtn.dropdown .icon {\n    color: #000;\n}\n\n#search .codebtn.dropdown:not(.selection):hover .icon,\n#search .codebtn.dropdown:not(.selection).active .icon {\n    color:#FFF;\n}\n");addJ("main/code","code",function(ctx, path, sub) { 
    console.log('code');
    
    var open = $('#topbar .ui.open');
    var main = $('#content > .sgrid');
    var editLabel = $('#editLabel')[0];
    var fileFilter = $('#fileFilter');
    var codeFilter = $('#codeFilter');
    var filterNodes = function() {};
    var dbFile;
    var srcFile;
    var sql = null;
    var lines;
    var _this = this;
    
    fileFilter.on('input', function(e) {
        e.stopPropagation();
        clearTimeout(_filter);
        _filter = setTimeout(filterNodes, 1000);
    });
    
    fileFilter[0].onclick = function(e) { e.stopPropagation(); }; 
    
    editLabel.innerText = polyglot.t('code.hedit', {name:polyglot.t('main.nofile')});
    
    sub.progress = function(l, t, i) {
        $(i).progress({percent:(l * 100) / t});
    };
     
    function parse(input, after){
        var cs = 8388608;
        var cks = Math.ceil(input.size / cs);
        var r = new FileReader();
        var res = [0];
        var cr = '\n'.charCodeAt(0);
    
        var f = function(i) {
            if(i < cks) {
                var b =  i * cs;
                r.onload = function() {
                    var a = new Int8Array(r.result);
                    var s = -1;
                    while((s = a.indexOf(cr, s+1)) != -1) {
                        res.push(b + s);
                    }
                    f(i + 1);
                };
                r.readAsArrayBuffer(input.slice(b, b + cs));
            } else {
                after(res);
            }
        }
        f(0);
    }
    
    this.fileOpen = function() {
        $('.ui.modal.fileOpen').modal('show');
        ctx['code_file_open'].onOpen(function(d) {
            var _err = false;
            var lerr = error_init(main, polyglot.t('main.eh_load'), polyglot.t('code.e_load'), function() {
                lerr.remove();
            });
            var loader = loader_init(main, function() {
                return '<div style="width:50%;">' +
                            '<div class="ui active progress codeProgA">' +
                              '<div class="bar">' +
                                '<div class="progress"></div>' +
                              '</div>' +
                              '<div class="label">' + polyglot.t('code.loadA') + '</div>' +
                            '</div>' +
                            '<div class="ui active progress codeProgB">' +
                              '<div class="bar">' +
                                '<div class="progress"></div>' +
                              '</div>' +
                              '<div class="label">' + polyglot.t('code.loadB') + '</div>' +
                            '</div>' +
                        '</div>';
            });
            loader.show();
            open.addClass('disabled');
            var defer = defer_init(2);
            var after = function() {
                defer.once(function() {
                    open.removeClass('disabled');
                    loader.remove();
                    if(_err) {
                        lerr.show();
                    } else {
                        change.dasm_open(d.v, probe_label(d.pr));
                        parse(srcFile, function(l) {
                            lines = l;
                            sub.renderList();
                            lerr.remove();
                        });
                    }
                });
            };
            
            var r = raw_get('/sys/download/', {data:JSON.stringify({cmd:1}),ext_data:JSON.stringify({a:d.pid,b:d.d.b})}, function(d, err) {
                dbFile = err ? null : d;
                _err |= err;
                after();
                defer.ready();
            }, {responseType:'blob', noprogress:5000, onprogress: function(ev) {
                sub.progress(ev.loaded, ev.total, '.codeProgA');
            }});
            
            var r = raw_get('/sys/download/', {data:JSON.stringify({cmd:1}),ext_data:JSON.stringify({a:d.pid,b:d.d.a})}, function(d, err) {
                srcFile = err ? null : d;
                _err |= err;
                after();
                defer.ready();
            }, {responseType:'blob', noprogress:5000, onprogress: function(ev) {
                sub.progress(ev.loaded, ev.total, '.codeProgB');
            }});
        });
    }
    
    this.fileDrop = function() {
        $('.ui.modal.fileDrop').modal('show');
        ctx['code_file_drop'].onOpen(function(d) {
        });
    };
                   
    (function(){
        $('#search').css('display', 'none');             
        var _ctx = {};
        var _sizes = [20, 30, 20, 30];
        var _fill = [0, 10, 0, 10];
        var _panes = ['#left', '#center', '#search', '#right'];
        
        sub.pane = function(i) {
            return _panes[i];
        }
        
        ctx.split = function() {
            doSplit(_panes, _sizes, _ctx, ['#left', '#search'], _fill);
        }
        
        ctx.split();
    })();
    
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/textmate');
    editor.session.setMode('ace/mode/c_cpp');
    editor.setReadOnly(true);
    
    var tree;
    var setting = {callback:{
        beforeClick:function(id, n){
            return n.c === undefined;
        },
        onClick:function(ev, id, n) {
            var p = n.getPath();
            var fp = '';
            p.shift();
            p.forEach(function(n) {
               fp += '/' + n.n; 
            });
            openFile(n.file, fp);
        },
        beforeRename:function(treeId, treeNode, newName) {
            var p = treeNode.getParentNode();
            return p.c.every(function(n) {
                return n == treeNode || n.n !== newName;
            });
        },
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop
    }, view:{
        selectedMulti:false,
        addDiyDom:function(id, n) {
            if(n.c !== undefined) {
	            var nd = $("#" + n.tId + "_a");
	            nd.addClass('nodeDir');
            }
        },
    },
    data:{
        key:{
            name:'n',
            children:'c',
            isParent: 'p'
        },
        keep:{
            leaf:true,
            parent:true
        }
    },
    edit : {
        drag : {
            autoExpandTrigger : true,
            isCopy : false,
            isMove : true,
            prev : true,
            next : true,
            inner : true,
            borderMax : 10,
            borderMin : -5,
            minMoveSize : 5,
            maxShowNodeNum : 5,
            autoOpenTime : 500
        },
        editNameSelectAll : false,
        enable : true,
        showRemoveBtn : false,
        showRenameBtn : false
    }};
    
    var nodes = [
        {n:'/', open:true, c:[]}
    ];
        
    tree = $.fn.zTree.init($('#fileTree'), setting, nodes);
    
    filterNodes = function() {
        _filter = -1;
        var v = fileFilter.val()
        tree.showNodes(_hiddenNodes);
        if(v) {
            tree.setEditable(false);
            var l = tree.getNodesByParamFuzzy('n', v);
            var n = [];
            collectHide(n, tree.getNodes()[0], l);
            
            tree.hideNodes(n);
            _hiddenNodes = n;
            tree.expandAll(true);
        } else {
            tree.setEditable(true);
            _hiddenNodes = [];
        }
        fixSelect();
    }
    
    $('#topbar .ui.open.dropdown').dropdown({
       transition: 'fade up',
       context: 'body',
       action:'hide'
    });
    
    var d = $('#topbar .ui.visibility.dropdown');
    d.dropdown({
       transition: 'fade up',
       context: 'body',
       action:'nothing'
    });
    
    d.find('.checkbox').each(function(i, v) {
        $(v).checkbox({
            onChecked: function() {
                var n = $(sub.pane(i));
                var el = n[0];
                el.style.opacity = 0;
                n.css('display', 'block');
                ctx.split();
                _fadeIn(el, 200);
            },
            onUnchecked: function() {
                fadeOut($(sub.pane(i))[0], 200, function() {
                    ctx.split();
                });
            }
        });
    });
    
    var ld = $('#left .ui.search.dropdown');
    ld.on('click', function() {
        var p = fileFilter.parents('.filter').parent();
        p.toggleClass('hide');
        var l = $('#left');
        var c = l.children();
        p.insertAfter(p.hasClass('hide') ? c.last() : c.first());
        $('#fileTree').toggleClass('shortFilter');
        fileFilter.focus();
    });
    
    this.setDirs = function(items) {
        var n = tree.getNodes();
        n.forEach(function(v) {
            tree.removeNode(v);
        });
        domy.defer(function() {
            tree.addNodes(null, items, true);
            tree.expandNode(tree.getNodes()[0], true);
        });
    }
    
    this.getDirs = function() {
        return tree.getNodes();
    }
    
    function openFile(f, p) {
        var r = new FileReader;
        change.src_open(p);
        r.onload = function(v) {
            $('#editor').removeClass('hide');
            editor.setValue(r.result);
            editor.clearSelection();
            editLabel.innerText = polyglot.t('code.hedit', {name:p});
            editor.session.setScrollTop(0);
        }
        r.readAsText(f);
    }
    
    function fixSelect(clear) {
        var s = tree.getSelectedNodes();
        if(clear || s.length == 0) {
            editLabel.innerText = polyglot.t('code.hedit', {name:polyglot.t('main.nofile')});
            $('#editor').addClass('hide');
        }
    }
    
    function addDir(r) {
        clearFilter();
        var nn = {n:polyglot.t('code.new_dir'),c:[],p:true};
        var n = tree.addNodes(r, nn)[0];
        if(n) {
            tree.editName(n);
            fixSelect(true);
        }
    }
    
	function beforeDrag(treeId, treeNodes) {
	    if(treeNodes != 0) {
            fixSelect(treeNodes[0].c !== undefined);
	    }
		return treeNodes != 0;
	}
	
	function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		return targetNode != null && (targetNode.level != 0 || moveType == 'inner');
	}
	
	var _filter = -1;
	var _hiddenNodes = [];
    function clearFilter() {
        clearTimeout(_filter);
        fileFilter.val(null);
        tree.showNodes(_hiddenNodes);
        _hiddenNodes = [];
        _filter = -1;
    }
    
    function collectHide(r, n, l) {
        if(n.c !== undefined) {
            var h = true;
            n.c.forEach(function(m) {
                h &= collectHide(r, m, l);
            });
            if(h && n.level != 0) {
                r.push(n);
                return true;
            }
        } else {
            if(l.indexOf(n) == -1) {
                r.push(n);
                return true;
            }
        }
        return false;
    }
    
    var _opt;
    function disabled(key, opt) {
        if(_opt > 0) {
            return (_opt != 1 || key != 'add_dir') && (key != 'remove' || _opt == 1);
        } else {
            return false;
        }
    }
    
    $.contextMenu({
        zIndex: 103,
        appendTo:'#content',
        selector:'#fileTree a', 
        callback:function(key, options) {
            switch(key) {
                case 'add_dir':
                    var n = tree.getNodeByTId(this[0].parentNode.id);
                    addDir(n);
                    break;
                case 'remove':
                    var n = tree.getNodeByTId(this[0].parentNode.id);
                    tree.removeNode(n);
                    fixSelect();
                    break;
                case 'rename':
                    var n = tree.getNodeByTId(this[0].parentNode.id);
                    tree.editName(n);
                    fixSelect(n.c !== undefined);
                    break;
            }
        },
        items:{
            'add_dir':{name:'New Directory', icon:'add', disabled:disabled},
            'remove':{name:'Remove', icon:'remove', disabled:disabled},
            'rename':{name:'Rename', icon:'edit', disabled:disabled},
        },
        events:{
            show :function(options){
                var n = tree.getNodeByTId(this[0].parentNode.id);
                var leaf = n.c === undefined;
                _opt = leaf ? 2 : 0;
                _opt += n.level == 0;
                if(leaf) {
                    tree.selectNode(n);
                }
            }
        }
    }); 

    (function(){
        var ct = $('#search');
        var cf = codeFilter;
        var cl = $('#search .codeList');
        var l = cf.prev();
        var t = cf.parent().find('.toggl');
        
        var sf = search_filter('#codeFilter', '#search'); 
        
        do_visible_split(ct, function() {
            sf.ld.trigger('click');
        });
    
        sub.toView = function(pos) {
            var l = sub.getList();   
            var fl = function(offset) {
                for(var i = 0; i < lines.length; i++) {
                    if(lines[i] > offset)
                        return i - 1 > 0 ? i - 1 : -1;
                }
                return -1;
            }
            l.scrollTo(fl(pos));
        }
    
        sub.doSearch = function() {
            var idx = sub.getSIdx();
            var up = t.hasClass('up');
            switch(idx) {
                case 0:
                    var p = cf.val().split(':');
                    var tl = p[1].split('-');
                    var n = p[0];
                    var ln = parseInt(tl[0]);
                    var le = parseInt(tl[1]);
                    var nr = 0;
                    var nle = isNaN(le);
                    cl.html('');
                    if(sql && n && ln) {
                      sql.qry({
                            id: 4,
                            action: 'each',
                            sql:"select path,line,addr,view_offset from files, lines WHERE lines.cu_file_id=files.id AND lines.line >= ? " + (nle ? '' : 'AND lines.line <= ?') + " AND view_offset IS NOT NULL AND files.path LIKE '%' || ? ORDER BY lines.line " + (up ? 'ASC ' : 'DESC ') + (nle ? ' LIMIT 1;' : ';'),
                            params:nle ? [ln, n] : [ln, le, n]
                        }, function(ev) {
                            var r = ev.data.row;
                            if(r) { 
                                if(nr == 0) {
                                    sub.toView(r.view_offset);
                                }
                                nr++;
                                var sb = function(c) {
                                    return "\"var t = this;(function(){var ctx=getCtx('main/code'),sub=ctx['code'],f=function(event) { event.preventDefault();" + c + " };f.call(t, event)})()\""; 
                                };
                                
                                cl.append('<a class="ui item" href="#" onclick=' + sb('sub.toView(' + r.view_offset + ');') + '>' + r.path + ':' + r.line + '</a>');
                            }
                        });
                    }
                    break;
            }
        };
        
        var s = list_search(cf, sub.doSearch);
        
        var sl = function(lbl) {
            cf.attr('placeholder', lbl);
            l.text(lbl);
        };
        
        sub.resetSearch = function() {
            var idx = sub.getSIdx();
            switch(idx) {
                case 0:
                    sl(polyglot.t('code.sch_l2a'));
                    break;
            }
            cf.text('');
        };
    })();
    
    (function(){
        var bn;
        var c = $('#search .ui.codesel.dropdown');
        var b = $('#search .ui.codebtn.dropdown');
        var r = $('#search');
        var idx = -1;
        c.dropdown({
           transition: 'fade up',
           context: 'body',
           onChange: function(value, text, $choice) {
                idx = $(c[0].firstChild).children().index($choice[0]);
                b.children().first().text(polyglot.t('code.view_p') + text);
                bn = {name:'', src:text.toLowerCase() + '.html'};
                sub.resetSearch();
           }
        });
        
        sub.getSIdx = function() {
            return idx;
        }
    
        _this.codeSel = function() {
            c.css('width', b.outerWidth(true) + 'px');
            c.click();
        };
        
        c.dropdown('set selected', polyglot.t('code.view_l2a'));
    })();
    
    (function() {
        var loader = loader_init(main, function() {
            return '<div class="ui text loader">' + polyglot.t('code.preload') + '</div>';
        });
        var defer = defer_init(1);
        var pending = false;
        var worker;
        
        loader.show();
        open.addClass('disabled');
        
        var sql = function(b, after) {
            var _m = {};
            if(pending) {
                after(null);
                return;
            }
            pending = true
            worker.postMessage({
                id:1,
                action:'open',
                buffer:b, 
            });
            
            worker.onmessage = function(event) {
                worker.onmessage = function(event) {
                    var d = event.data;
                    _m[d.id](event);
                    if(d.findihed) {
                        delete _m[event.data.id];
                    }
                
                }
                after({close:function() {
                    pending = false;
                }, qry:function(q, after) {
                    _m[q.id] = after;
                    worker.postMessage(q);
                }});
            };
            
            worker.onerror = function(e) { 
                console.log("Worker error: ", e);
            };
        };
        
        sub.sql = function(f, q, after) {
            defer.then(function() {
                sub.sql = sql;
                sql(f, q, after);
            });
        }
        
        var d = {num:0};
        function after() {
            if(--d.num == 0) {
                worker = new Worker(window.URL.createObjectURL(d.worker));
                worker.postMessage(d.wasm);
                worker.onmessage = function() {
                    loader.remove();
                    open.removeClass('disabled');
                    defer.ready();
                };
            }
        }
        
        _nload('js/worker.sql-wasm.js', d, function(b) {
            d.worker = b
            after();
        }, 0, {responseType:'blob'});
        
        _nload('js/sql-wasm.wasm', d, function(b) {
            d.wasm = b
            after();
        }, 0, {responseType:'blob'});
    
    })();
    
    
    (function() {
        var p = $('#right > .content');
        var list = null;
        
        sub.resizeList = function() {
            if(list) {
                list.onResize();
            }
        }
        
        function findLine(offset, s, e) {
            for(var i = s; i < e; i++) {
                if(lines[i] > offset)
                    return i - 1 >= s ? i - 1 : -1;
            }
            return -1;
        }
        
        $(window).on('resize', sub.resizeList);
            
        sub.getList = function() {
            return list;
        }
        
        sub.renderList = function() {
            if(list) {
                list.destroy();
            }
            
            if(sql) {
                sql.close();
            }
            sub.sql(dbFile, function(s) {
                sql = s;
                list = vlist_init(p, {
                    containerClass:'vlist_ct',
                    scrollerClass:'vlist_sc',
                    itemClass:'vlist_it',
                    holderClass:'vlist_hd',
                    rowCreator:function(ctx, it, o, i) {
                        ctx.items.push(it);
                        return '';
                    },
                    beforeRender:function(b, e) {
                        var ctx = {items:[]};
                        var r = new FileReader();
                        var vb = lines[b];
                        var ve = lines[e];
                        ctx.defer = defer_init(1);
                        r.onload = function() {
                            var lines = r.result.split('\n');
                            ctx.items.forEach(function(n, i) {
                                n.html('<pre>' + lines[i] + '</pre>');
                            });
                            ctx.defer.ready();
                        };
                        ctx.vb = vb;
                        ctx.ve = ve;
                        r.readAsText(srcFile.slice(vb, ve));
                        return ctx;
                    },
                    afterRender:function(ctx, b, e, commit) {
                        ctx.defer.then(function() {
                            var s = b;
                            sql.qry({
                                id: 3,
                                action: 'each',
                                sql: 'SELECT view_offset, line, addr, path FROM lines JOIN files ON(lines.cu_file_id = files.id) WHERE ? <= lines.view_offset AND lines.view_offset <= ? ORDER BY view_offset;',
                                params:[ctx.vb, ctx.ve]
                            }, function(ev) {
                                var r = ev.data.row;
                                if(r) {
                                    var l = findLine(r.view_offset, s, e);
                                    if(l != -1) {
                                        ctx.items[l - b].html('<pre>' + r.path + ':' + r.line  + '</pre>');
                                        s = l;
                                    }
                                }
                                
                                if(ev.data.finished) {
                                    commit();
                                }
                            });
                        });
                    },
                    numRows:lines.length
                });
            });
        };
    })();
    
    $(document).one('cacheDestroy', function() {
        var l = sub.getList();
        if(l) {
            l.destroy();
        }
        $(window).off('resize', sub.resizeList);
    });
 });addTmpl("main/run", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"errHolder\"><div class=\"errBar\"><div class=\"errDrag\" draggable=\"true\"></div><div class=\"ui red button errBtn\"></div><div class=\"ui right vertical labeled icon visible overlay sidebar\"><div><h4>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.errs",{"name":"l","hash":{},"data":data}))
    + "</h4></div><div class=\"ui divided list errList\"></div><div class=\"ui red button errClr\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.clr",{"name":"l","hash":{},"data":data}))
    + "</div></div></div></div><div class=\"sgrid\"><div id=\"left\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.list",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"runFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"runFilter\" name=\"runFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist runList paging_inner content\"></div></div><div class=\"ui pagination menu runPage fullw\"></div></div><div id=\"center\"><div class=\"ui segment fullw paging_outer\"><div id=\"runCfgLabel\" class=\"ui top attached blue label tov\"></div><div></div><div class=\"grid_c hide\"><form class=\"ui form form_c form-base\" onsubmit=\"event.preventDefault();\"><div class=\"form-row\"><label for=\"runId\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.id",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"runId\" name=\"runId\" disabled=\"\"></div><div class=\"form-row\"><label for=\"runName\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"runName\" name=\"runName\" disabled=\"\"></div><div class=\"form-row\"><label for=\"runDesc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"runDesc\" name=\"runDesc\"></textarea></div><div class=\"form-row\"><label for=\"runUID\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.uid",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"runUID\" name=\"runUID\"></div><div class=\"form-row\"><label for=\"runGID\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.gid",{"name":"l","hash":{},"data":data}))
    + "</label><input type=\"text\" id=\"runGID\" name=\"runGID\"></div><div class=\"form-row\"><button class=\"ui right blue button\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.save",{"name":"l","hash":{},"data":data}))
    + "</button></div><div class=\"doclear\"></div></form></div><div class=\"grid_e\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.norun",{"name":"l","hash":{},"data":data}))
    + "</div></div><div class=\"ui runsel dropdown item\" style=\"display:block;\"><div class=\"menu\" style=\"width:100%;\"><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.act",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.psv",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div class=\"ui menu\" style=\"position:relative;\"><a class=\"ui item clrToggle\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run'],f=function(event) {ctx.runClear();};f.call(t, event)})()\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.rclear",{"name":"l","hash":{},"data":data}))
    + "</a><a class=\"ui runbtn dropdown item\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run'],f=function(event) {ctx.runSel();};f.call(t, event)})()\"><div class=\"text\"></div><i class=\"dropdown icon\"></i></a></div></div><div id=\"inst\"><div class=\"ui segment fullw paging_outer\" style=\"height:100%;\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.inst",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"runIFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"runIFilter\" name=\"runIFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled selection list plist runIList paging_inner content\"></div></div></div><div id=\"right\" class=\"container-fluid\"><div class=\"grid_c hide\"><div class=\"stack-container\" data-bind=\"component: {name: 'dashboard-grid', params: $data}\"></div></div><div class=\"grid_e\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.norun",{"name":"l","hash":{},"data":data}))
    + "</div></div><div id=\"uses\" class=\"USER_EDIT\"><div class=\"ui segment fullw paging_outer\"><div class=\"ui top attached blue label\" style=\"overflow:visible;\"><div class=\"tov\" style=\"float:left;width:calc(100% - 30px)\">\n                    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.uses",{"name":"l","hash":{},"data":data}))
    + "\n                </div><div class=\"menu\" style=\"display:inline-block;float:right;widh:20px;\"><div class=\"ui search dropdown item\"><i class=\"ui icon search\"></i></div></div></div><div></div><div class=\"ui ins hide\"><div class=\"filter fullw\"><div class=\"ui icon input fl-wrap fullw tinput\"><i class=\"angle up link toggl icon\"></i><label for=\"usesFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"usesFilter\" name=\"usesFilter\" class=\"prompt search\" type=\"text\"><i class=\"search link icon\"></i></div></div></div><div class=\"ui middle aligned celled list plist usesList paging_inner content\"></div></div><div class=\"ui pagination menu usesPage fullw\"></div></div></div><div id=\"gridstack-template\" class=\"hide\"><div class=\"grid-stack\" data-bind=\"foreach: {data: widgets, afterRender: afterAddWidget}\"><div class=\"grid-stack-item\" data-bind=\"attr: {'data-gs-id': $data.id, 'data-gs-x': $data.x, 'data-gs-y': $data.y, 'data-gs-width': $data.width, 'data-gs-height': $data.height, 'data-gs-auto-position': $data.auto_position}\"><div class=\"grid-stack-item-content ui segment\"><div class=\"ui top attached blue label tov\"><span data-bind=\"text: $data.lbl\" style=\"float:left;\"></span><a href=\"javascript:var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx[''],f=function(event) {void(0);};f.call(t, event)})()\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx[''],f=function(event) {ctx.close(this);};f.call(t, event)})()\"><i class=\"icon close\" style=\"float:right;\"></i></a><a href=\"javascript:var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx[''],f=function(event) {void(0);};f.call(t, event)})()\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx[''],f=function(event) {ctx.maximize(this);};f.call(t, event)})()\"><i class=\"icon caret up\" style=\"float:right;\"></i></a></div><div></div><div class=\"content\"></div></div></div></div><!-- NO SPACE BETWEEN THESE CLOSING TAGS --></div>";
},"useData":true},"");addA("main/run","run",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
        sub.lb = new FloatLabels('.sgrid', {'style':1, customEvent:autofill});
     });addTmpl("main/run", "topbar",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui edit dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.edit",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.run",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item RUN_ADD\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['topbar'],f=function(event) {ctx.runAdd();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.add",{"name":"l","hash":{},"data":data}))
    + "\n            </div><div class=\"item runSavePos\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['topbar'],f=function(event) {ctx.runSave();};f.call(t, event)})()\">\n                "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.saver",{"name":"l","hash":{},"data":data}))
    + "\n            </div></div></div><div class=\"item\" style=\"padding:0.2rem;\"><div class=\"ui form runActiveFrm\"><label for=\"runActive\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.active",{"name":"l","hash":{},"data":data}))
    + "</label><input style=\"height:2.3rem;\" class=\"ui input\" type=\"text\" id=\"runActive\" name=\"runActive\" readonly=\"\"></div></div><div class=\"ui play item\" style=\"padding:0;\"><div class=\"item\"><i class=\"play icon\"></i><label class=\"plbl\"></label></div><div class=\"item sel\"><i class=\"stop icon\"></i></div></div><div class=\"ui config dropdown item\"><div class=\"text\"></div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.view_c",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"item\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.view_r",{"name":"l","hash":{},"data":data}))
    + "</div></div></div><div class=\"ui visibility dropdown item\"><div class=\"text\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.vis",{"name":"l","hash":{},"data":data}))
    + "</div><i class=\"dropdown icon\"></i><div class=\"menu\"><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vlist\" id=\"vlist\" checked=\"\"><label for=\"vlist\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.list",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vedit\" id=\"vedit\"><label for=\"vedit\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.option",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vinst\" id=\"vinst\"><label for=\"vinst\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.inst",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vdiss\" id=\"vdiss\" checked=\"\"><label for=\"vdiss\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.view",{"name":"l","hash":{},"data":data}))
    + "</label></div></div><div class=\"item USER_EDIT\"><div class=\"ui toggle checkbox\"><input type=\"checkbox\" name=\"vdiss\" id=\"vuses\"><label for=\"vuses\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.uses",{"name":"l","hash":{},"data":data}))
    + "</label></div></div></div></div>";
},"useData":true},"");addA("main/run","topbar",function(ctx, path, sub, load) { 
            if(sub.lb) {
                sub.lb.destroy();
            }
            sub.lb = new FloatLabels('.runActiveFrm', {'style':1, customEvent:autofill});
         });addA("main/run","",function(ctx, path, sub, load) { 
    if(!load) {
        module_viewed();
    }
 });addTmpl("main/run", "modal",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui modal runAdd\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.add",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.add_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"runAddE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"divide\" style=\"left:57.5%;bottom: -25px;\"></div><div class=\"ui grid\" style=\"padding:20px;\"><div style=\"width:calc(60% - 2rem);margin:0;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.acfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run_add'],f=function(event) {ctx._run_add(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"add_name\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.name",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_name\" name=\"add_name\" type=\"text\" class=\"field\" required=\"required\"></div><div class=\"form-row\"><label for=\"add_desc\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.desc",{"name":"l","hash":{},"data":data}))
    + "</label><textarea id=\"add_desc\" name=\"add_desc\" rows=\"6\"></textarea></div></form></div></div></div><div style=\"width:40%;margin:0 0 0 2rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.agrp",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"fullw\" style=\"height:calc(100% - 2rem);\"><div><div class=\"ui icon input tinput fl-wrap fullw\"><i class=\"angle up link toggl icon\"></i><label for=\"runAddFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"runAddFilter\" name=\"runAddFilter\" class=\"prompt fullw\" type=\"text\"><i class=\"search link icon\"></i></div></div><div class=\"ui segment fullw tlist\" style=\"height:calc(100% - 5rem);\"><div class=\"ui middle aligned celled selection list runGroupList mlist fullw fullh\"></div></div><div class=\"ui pagination menu runGroupPage fullw\"></div></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run_add'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div><div class=\"ui modal runAddModule\" role=\"dialog\" aria-modal=\"true\"><div class=\"ui header blue label\">\n    "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.addI",{"name":"l","hash":{},"data":data}))
    + "\n  </div><div class=\"content\"><div class=\"description\"><p>"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.addI_d",{"name":"l","hash":{},"data":data}))
    + "</p><div class=\"runAddModuleE\"><div class=\"ui negative message form-row hide\" style=\"margin-bottom:5px;\"><div class=\"header\"></div><p></p></div></div><div style=\"position:relative;height:100%;\"><div class=\"divide\" style=\"left:57.5%;bottom: -25px;\"></div><div class=\"ui grid\" style=\"padding:20px;\"><div style=\"width:calc(60% - 2rem);margin:0;min-height:17rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.aicfg",{"name":"l","hash":{},"data":data}))
    + "</div><div style=\"display:inline-block;vertical-align:middle;\" class=\"form-base\"><div><form action=\"#\" method=\"post\" class=\"ui form\" onsubmit=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run_add_module'],f=function(event) {ctx._run_add_module(event, this);};f.call(t, event)})()\"><div class=\"form-row\"><label for=\"add_run_name\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.rname",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_run_name\" name=\"add_run_name\" type=\"text\" class=\"field\" disabled=\"\"></div><div class=\"form-row\"><label for=\"add_inst_name\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.iname",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"add_inst_name\" name=\"add_inst_name\" type=\"text\" class=\"field\" required=\"required\"></div></form></div></div></div><div style=\"width:40%;margin:0 0 0 2rem;\"><div class=\"ui small header\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"run.ilist",{"name":"l","hash":{},"data":data}))
    + "</div><div class=\"fullw\" style=\"height:calc(100% - 2rem);\"><div><div class=\"ui icon input tinput fl-wrap fullw\"><i class=\"angle up link toggl icon\"></i><label for=\"runAddIFilter\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"main.list_f",{"name":"l","hash":{},"data":data}))
    + "</label><input id=\"runAddIFilter\" name=\"runAddIFilter\" class=\"prompt fullw\" type=\"text\"><i class=\"search link icon\"></i></div></div><div class=\"ui segment fullw tlist\" style=\"height:calc(100% - 5rem);\"><div class=\"ui middle aligned celled selection list runIListA mlist fullw fullh\"></div></div><div class=\"ui pagination menu runIPageA fullw\"></div></div></div></div></div></div></div><div class=\"actions\"><div class=\"ui blue deny button\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.cancel",{"name":"l","hash":{},"data":data}))
    + "\n    </div><div class=\"ui blue accept right labeled icon button\" onclick=\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run_add_module'],f=function(event) {sub.onOk();};f.call(t, event)})()\">\n      "
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"dialog.accept",{"name":"l","hash":{},"data":data}))
    + "\n      <i class=\"checkmark icon\"></i></div></div></div>";
},"useData":true},"");addA("main/run","run_add_module",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.runAddModule', {'style':1, customEvent:autofill});
     });addS("main/run", "_sid4","\n");addJ("main/run","run_add_module",function(ctx, path, sub) { 
    var _this = this;
    var _canClose = true;
    var _modal = $('.ui.modal.runAddModule');
    var _btn = _modal.find('.accept.button');
    var sel = null;
    var sel_data;
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                    
    $('#add_inst_name').on('input', onChange);
    $('#add_run_name').on('input', onChange);
                  
    function onChange() {
        var v = $('#add_inst_name').val();
        if(v === '' || sel == null) {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    } 
                   
    sub.onOpen = function(o, after) {
        sub.after = after;
        submit_err(-1, true);
        var n = $('#add_inst_name');
        label_reset(n);
        $('#runAddIFilter')[0].reset();
        label_set($('#add_run_name'), o.n);
        sub.resetInsts();
        n.focus();
        sel_data = o;
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
       var f = _modal.find('form'); 
       f.submit();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.runAddModuleE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('run.e_existG');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('run.e_addI');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
    this._run_add_module = function(ev, el_frm) {
        _canClose = false;
        ev.preventDefault();
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var data = {a:form_get(el_frm, 'add_inst_name')
        };
        
        data.n = sel_data.id;
        data.m = sel;
        
        frm.append('data', '{"cmd":89}');
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            if(d.r == 0) {
                data.id = d.d;
                data.mid = d.m;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(d.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
    (function() {
        var l = $('.runIListA');
        var p = $('.runIPageA');
        var n = {page:'main/run',
                 sub:'run_add_module',
                 pg:'sub.requestInsts(p)',
                 kd:'sub.requestInsts(parseInt(this.value)-1, event)'
        };
        
        list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function(o) {
            sel = o.id;
            onChange();
        });
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        };
        
        sub.resetInsts = function() {
            sel = null;
            onChange();
            paging_reset(n);
            sub.requestInsts();
        }
        
        var s = list_search($('#runAddIFilter'), sub.resetInsts);
        
        sub.requestInsts = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    post('/sys/server/', {data:JSON.stringify({cmd:72}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        render(r);
                    });
                }
            }, l, p, n, po);
        };
    })();
 });addA("main/run","run_add",function(ctx, path, sub, load) { 
        if(sub.lb) {
            sub.lb.destroy();
        }
		sub.lb = new FloatLabels('.ui.modal.runAdd', {'style':1, customEvent:autofill});
     });addS("main/run", "_sid3","\n");addJ("main/run","run_add",function(ctx, path, sub) { 
    var _this = this;
    var _canClose = true;
    var _modal = $('.ui.modal.runAdd');
    var _btn = _modal.find('.accept.button');
    var sel = null;
    _modal.modal({detachable:false,
                  autofocus: false,
                        dimmerSettings:{
                            useCSS:true,
                            opacity:0.5
                        },
                        onShow:onShowModal,
                        onHide:function() {
                            if(_canClose) {
                                onHideModal();
                                return true;
                            } 
                             
                            $('body').dimmer('show');
                            return false;
                        },
                        onDeny:function(){
                            return _canClose;
                        },
                        onVisible:onVisibleModal,
                        onHidden:onHiddenModal
                    });
                    
    $('#add_name').on('input', onChange);
                  
    function onChange() {
        var v = $('#add_name').val();
        if(v === '') {
            _btn.addClass('disabled');
        } else {
            _btn.removeClass('disabled');
        }
    } 
                   
    sub.onOpen = function(after) {
        sub.after = after;
        submit_err(-1, true);
        var n = $('#add_name');
        label_reset(n);
        $('#runAddFilter')[0].reset();
        label_reset($('#add_desc'));
        sub.resetGroups();
        n.focus();
    };
    
    sub.onOk = function() {
        if(!_canClose)
            return;
       var f = _modal.find('form'); 
       f.submit();
    }
    
    function submit_err(i, nofade) {
        var el = _modal.find('.runAddE')[0];
        var d = el.firstChild;
        var h = d.firstChild;
        var p = h.nextSibling;
        var hm;
        var m;
        switch(i) {
            case 0:
                hm = polyglot.t('main.eh_exist');
                m = polyglot.t('run.e_exist');
                break;
            case 1:
                hm = polyglot.t('main.eh_fail');
                m = polyglot.t('run.e_add');
                break;
            default:
                if(nofade) {
                    d.classList.add('hide');
                } else {
                    _fadeOut(d, 200, function() {
                        d.classList.add('hide');
                    });
                }
                return;
        }
        h.textContent = hm;
        p.textContent = m;
        _fadeIn(d, 200);
        d.classList.remove('hide');
    }
    
    this._run_add = function(ev, el_frm) {
        _canClose = false;
        ev.preventDefault();
        if(!form_set_load(el_frm)) {
            _canClose = true;
            return;
        }
        
        submit_err(-1, true);
        
        var grid = _modal.find('.grid');
        grid.addClass('nomouse');
        _btn.addClass('loading');
        
        var frm = new FormData();
        
        var data = {n:form_get(el_frm, 'add_name'), 
                    d:form_get(el_frm, 'add_desc')
        };
        
        if(sel != null) {
            data.g = sel;
        }
        
        frm.append('data', '{"cmd":84}');
        frm.append('ext_data', JSON.stringify(data));
        _post('/sys/server/', frm, function(d) {
            form_set_ready(el_frm);
            _canClose = true;
            grid.removeClass('nomouse');
            _btn.removeClass('loading');
            var r = d.constructor === String ? JSON.parse(d) : d;
            if(r.r == 0) {
                data.id = d.d;
                sub.after(data);
                _modal.modal('hide');
            } else {
                if(r.r == 14) {
                    submit_err(0);
                } else {
                    submit_err(1);
                }
            }
        }, {responseType:'json'});
    };
    
    (function() {
        var l = $('.runGroupList');
        var p = $('.runGroupPage');
        var n = {page:'main/run',
                 sub:'run_add',
                 pg:'sub.requestGroups(p)',
                 kd:'sub.requestGroups(parseInt(this.value)-1, event)'
        };
        
        list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function(o) {
            sel = o.id;
            onChange();
        });
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        };
        
        sub.resetGroups = function() {
            sel = null;
            onChange();
            paging_reset(n);
            sub.requestGroups();
        }
        
        var s = list_search($('#runAddFilter'), sub.resetGroups);
        
        sub.requestGroups = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    post('/sys/server/', {data:JSON.stringify({cmd:15}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        render(r);
                    });
                }
            }, l, p, n, po);
        };
    })();
 });addS("main/run", "_sid2","\n    .grid-stack-item-content.ui.segment {\n        padding:0;\n        height:100%;\n    }\n    \n    .grid-stack-item-content .pad {\n        padding:1em;\n        height:100%;\n    }\n    \n    .grid-stack-item-content .pad:after {\n        content:\"\";\n        display:block;\n        height:4em;\n        width:100%;\n    }\n    \n    .grid-stack-item-content.ui.segment .content {\n        overflow:auto;    \n        height: calc(100% - 2.3em);\n    }\n    \n    .grid-stack-item-content > .top.label a { \n        outline: 0;\n    }  \n    \n    .grid-stack-item-content > .top.label a:active { \n        outline: none; \n        \n    }  \n    \n    .grid-stack-item-content > .top.label a:focus {\n        -moz-outline-style: none; \n    }\n    \n    .grid-stack-item-content > .top.label .icon {\n        padding:0 0.8rem 0 0.8rem;    \n    }\n    \n    .grid-stack-item-content > .top.label .close {\n        display:none;\n    }\n    \n    .stack-container.config .grid-stack-item-content > .top.label .close {\n        display:initial;\n    }\n    \n    .container-fluid {\n        padding-bottom:10px;\n        border: 2px dashed #dedede;\n    }\n    \n    #right .grid_c + .grid_e {\n        top:0 !important;\n    }\n    \n    #right .grid_c {\n        padding:0 !important;\n        height:100% !important;\n    }\n    \n    .stack-container {  \n        position:relative; \n        overflow:auto;    \n        height:100%;\n    }\n    \n    .stack-container.maxed { \n        overflow:hidden;\n    }\n    \n    #right .grid-stack .grid-stack-placeholder > .placeholder-content {\n        left:0px;\n    }\n    \n    #right .grid-stack > .grid-stack-item > .grid-stack-item-content {\n        left:-1px;\n    }\n    \n    #right .grid-stack > .grid-stack-item.maxed .grid-stack-item-content {\n        right:0px;\n    }\n\n    .stack-container,\n    .container-fluid,\n    div.grid-stack {\n        width:100%;\n    }\n    \n    div.grid-stack {\n        position:static;\n        overflow:hidden;\n    }\n    \n    .grid-stack div.grid-stack-item.maxed {    \n        position:absolute;\n        top:0;\n        left:0;\n        right:0;\n        bottom:0;\n        height:calc(100% + 4px);\n        width:100%;\n        z-index:2;\n    }\n    \n    .grid-stack div.grid-stack-item {\n        margin-top:-2px;\n    }\n    \n    #topbar .ui.play .icon {\n        vertical-align:middle;\n    }\n    \n    #topbar .ui.play div {\n        display:inline-flex;\n        padding-right:0.73rem;    \n        height:100%;\n        cursor:pointer;\n    }\n    \n    #topbar .ui.play .plbl {\n        position:absolute;\n        bottom:0;\n        left:0;\n        line-height:10px;\n        font-size:10px;\n    }\n    \n    #topbar .ui.play div.sel {\n        background:#54a3e1;\n        color:#FFF;\n    }\n    \n    #topbar .ui.play div:hover {\n        background:#3E93D8;\n        color:#FFF;\n    }\n    \n    #topbar .ui.play div.item.inactive {\n        pointer-events:none;\n        opacity:0.3;\n        background:none;\n    }\n    \n    #topbar .ui.play div.item.inactive:hover,\n    #topbar .ui.play div.item.inactive.sel {\n        background:#54a3e1;\n        opacity:0.7;\n    }\n    \n    #center .ui.menu {\n        min-height:1.857143em;\n        margin: 0;\n        overflow:hidden;\n    }\n    \n    #center .ui.menu .item {\n        padding:0.2rem 1rem 0.2rem 1rem;\n    }\n    \n    #center .menu > .item:before {\n        background-color: #dedede;\n    }\n    \n    #center .runbtn.dropdown .icon {\n        color: #000;\n    }\n    \n    #center .runbtn.dropdown:not(.selection):hover .icon,\n    #center .runbtn.dropdown:not(.selection).active .icon {\n        color:#FFF;\n    }\n    \n    #content > .errHolder {\n        width:0px;\n        float:right;\n    }\n    \n    #content > .errHolder .errBar {\n        position:absolute;\n        top:0;\n        bottom:0;\n        right:0;\n        width:0px;\n        display:none;\n    }\n    \n    #content > .errHolder .ui.sidebar {\n        background:#fff;\n        border:1px solid #dfdee6;\n        border-top-left-radius:4px !important;\n        border-bottom-left-radius:4px !important;\n        position:relative;    \n        width:100%;\n        padding:20px;\n        top:-42px;\n    }\n    \n    #content > .errHolder .errBtn {\n        position:relative;\n        top:20px;\n        z-index:999;\n    }\n    \n    #content > .errHolder .errList {\n        position:absolute;\n        overflow:auto;\n        top:35px;\n        bottom:55px;\n        right:0;\n        left:20px;\n    }\n    \n    #content > .errHolder .errDrag {\n        height:100%;\n        width:4px;\n        position:absolute;\n        cursor:col-resize;\n        z-index: 998;\n    }\n    \n    #content > .errHolder .errList .item {\n        border-top:1px solid #FFBDBB;\n        padding:10px 0;\n    }\n    \n    #content > .errHolder .errList .item:first-child {\n        border-top:none;\n    }\n    \n    #content > .errHolder .errClr {\n        position:absolute;\n        bottom:20px;\n        right:20px;\n    }\n");addJ("main/run","run",function(ctx, path, sub) { 
    console.log('run');
    
    var _this = this;
    var grid;
    var cont;
    var sel = null;
    var defer = defer_init(2);
    var deferList = defer_init(1);
    var deferRender = defer_init(1);
    var deferAdd = defer_init(1);
    var sel_name;
    var cfgLabel = $('#runCfgLabel')[0];
    var mode;
    var lock = lock_post_init(sub);
    var moduleCache = module_cache({});
    
    deferAdd.ready();
    
    cfgLabel.innerText = polyglot.t('run.option_s', {name:polyglot.t('run.norun')});
    
    sub.tmplChange = function(e, id, x, v) {
        // TODO find run instances based on module and call chande mode
    };
    
    sub.onProbeChange = function(e, probes) {
        var a = _this.getActive();
        if(a != null) {
            _this.startProbes(a);
        }
    };
    
    $(document).on('tmplChange', sub.tmplChange);
    $(document).on('probeChange', sub.onProbeChange);
        
    $('#topbar .ui.edit.dropdown').dropdown({
       transition:'fade up',
       context:'body',
       action:'hide'
    });
    
    this.runAdd = function() {
        $('.ui.modal.runAdd').modal('show');
        ctx['run_add'].onOpen(function(d) {
            sub.onAddRun(d);
            change.run_edit(d.id, d.n, 0);
        });
    };
    
    _need_reset = {};
    
    this.runAddModule = function(o) {
        var rid = sel;
        $('.ui.modal.runAddModule').modal('show');
        ctx['run_add_module'].onOpen(o, function(it) {
            var e = {id:it.id,mid:it.mid,n:it.a};
            var cfg = sub.getCfg();
            var d = sub.getInst().d;
            var pos = cfg.o.pos || {};
            deferAdd.reset();
            var ni = sub.renderWidget(pos, e);
            ni.item = e;
            deferAdd.ready();
            d.push(e);
            sub.sortInst();
            sub.resetInsts();
            sub.resetModules();
            _need_reset[rid] = true;
        });
    };
    
    this.runSave = function() {
        sub.savePos();
    };
    
    (function(){
        btn = $('#center .clrToggle');
        _this.updateClear = function() {
            if(sel != null && _need_reset[sel]) {
                btn.addClass('active');
            } else {
                btn.removeClass('active');
            }
        } 
        _this.runClear = function() {
            if(sel != null) {
                if(_need_reset[sel]) {
                    delete _need_reset[sel];
                } else {
                    _need_reset[sel] = true;
                }
            }
            _this.updateClear();
        };
    })();
    
    var rFilter = search_filter('#runFilter', '#left');  
    var iFilter = search_filter('#runIFilter', '#inst'); 
    var uFilter = search_filter('#usesFilter', '#uses');
    
    visibility_init(sub, $('#topbar .ui.visibility.dropdown'), function(i) { return sub.pane(i); });
    
    
    (function(){
        var l = $('#content > .errHolder .errList');
        var b = $(' #content > .errHolder .errBar');
        var btn = $('#content > .errHolder .errBtn');
        var clr = $('#content > .errHolder .errClr');
        var edrg = $('#content > .errHolder .errDrag');
        var sb = b.find('.sidebar');
        var num = 0;
        var o = false;
        var n = '50%';
        var limit = 9999;
        var close = function(after) {
            domy.off(function(f){
                btn.css('visibility', 'hidden');
                b.animate({width:'0%'}, 300, f);
            }, this, function() {
                btn.css('visibility', '');
                if(after) {
                    after();
                }
            });
        }
        var rf = function() {
            if(num == 0) {
                close(function() {
                    b.css('display', '');
                });
            }
            domy.off(function() {
                btn.text('' + num);
                setTimeout(function() {
                    var w = btn.outerWidth();
                    btn.css('left', (-w + 10) + 'px');
                });
            });
        }
        
        var didx = -1;
        var me;
        var dragEnd = function() {
            clearInterval(didx);
            btn.css('visibility', '');
            sb.css('box-shadow','');
        };
        
        edrg.on('drag', function(e) {
            me = e;
        });
    
        edrg.on('dragstart', function(e) {
            me = e;
            btn.css('visibility', 'hidden');
            sb.css('box-shadow','none');
            didx = setInterval(function() {
                domy.off(function(f){
                    var w = $(window).width();
                    var p = me.pageX;
                    if(p < 300) { p = 300; }
                    p = Math.floor(((w - p)* 100) / w);
                    n =  p + '%';
                    b.animate({width:n}, 80, f);
                }, this, function() {
                });
            }, 100);
        });
        edrg.on('dragend', dragEnd);
        edrg.on('drop', dragEnd);
        
        clr.on('click', function() {
            l.html('');
            num = 0;
            o = false;
            rf();
        });
        btn.on('click', function() {
           if(o) {
               close();
           } else {
                domy.off(function(f) {
                    btn.css('visibility', 'hidden');
                    b.animate({width:n}, 300, f);
                }, this, function() {
                    btn.css('visibility', '');
                });
           }
           o = !o;
        });
        ctx.addError = function(ty, msg) {
            domy.off(function() {
                var first = num == 0;
                num++;
                var ns = l[0].scrollHeight - l[0].offsetHeight - l[0].scrollTop < 1;
                if(l[0].childElementCount >= limit) {
                    l.children.slice(0, l[0].childElementCount - limit).remove();
                    num = limit;
                }
                rf();
                
                var frag = document.createDocumentFragment();
                var item = $('<div class="item"></div>').appendTo(frag);
                $('<div>' + ty + ':</div>').appendTo(item);
                var msgel = $('<pre style="white-space: pre-wrap;word-break: keep-all;"></pre>').appendTo(item);
                msgel.text(msg);
                
                l.append(frag);
                
                
                if(ns) {
                    l.scrollTop(l[0].scrollHeight);
                }
                
                if(first) {
                    b.css('display', 'block');
                }  
            });
        };
        lib_set_error(ctx.addError);
    })();
    
    function request_prepare(s, pr, o) {
        var pi = {id:pr.id, s:s};
        o.p = pi;
        if(pr.n) {
            pi.idn = pr.n;
        }
        return pr;
    }
    
    function request_compile(id, kversion, machine, flags, after) {
        var o = {
            onResult:function(d) {
                if(after) {
                    after();
                }
            },
            onError:function(d) {
                if(d.e) {
                    $.event.trigger({
                    	type: "onCompileError"
                    }, [id, kversion, machine, d]);
                    ctx.addError('request_compile', d.e);
                    this.hasError = true;
                } else {
                    if(!this.hasError) {
                        ctx.addError('request_compile', 'request_compile error');
                    }
                }
                if(after) {
                    after(true, d.e);
                }
            }
        };
        var d = {t:40, x:id + ((flags || 0) * 4294967296), y:machine, data:''+kversion};
        request_client(d, o);
    }
    
    function request_run(id, s, pr, flags, after) {
        var o = {
            onResult:function(d) {
                if(after) {
                    after();
                }
            },
            onError:function(d) {
                if(d.e) {
                    ctx.addError('request_run', d.e);
                    this.hasError = true;
                } else {
                    if(!this.hasError) {
                        ctx.addError('request_run', 'request_run');
                    }
                }
                if(after) {
                    after(true);
                }
            }
        };
        var pr = request_prepare(s, pr, o);
        var d = {t:41, p:o.p, x:pr.t, y:id + ((flags || 0) * 4294967296), data:login_current().r};
        request(d, o);
    }
    
    function request_stop(after) {
        var o = {
            onResult:function(d) {
                if(after) {
                    after();
                }
            },
            onError:function(d) {
                if(d.e) {
                    ctx.addError('request_stop', d.e);
                    this.hasError = true;
                } else {
                    if(!this.hasError) {
                        ctx.addError('request_stop', 'request_stop');
                    }
                }
                if(after) {
                    after(true);
                }
            }
        };
        var flags = 0;
        var d = {t:43, y:flags, data:''};
        request_client(d, o);
    }
    
    function request_attach(rid, ty, after) {
        var o = {
            onResult:function(d) {
                if(after) {
                    after();
                }
            },
            onError:function(d) {
                if(d.e) {
                    ctx.addError('request_attach', d.e);
                    this.hasError = true;
                } else {
                    if(!this.hasError) {
                        ctx.addError('request_attach', 'request_attach');
                    }
                }
                if(after) {
                    after(true);
                }
            }
        };
        var d = {t:44, x:rid, y:ty ? 1 : 0, data:''};
        request_client(d, o);
    }
    
    function request_version(s, pr, after) {
        var o = {
            onResult:function(d) {
                if(after) {
                    after(false, d);
                }
            },
            onError:function(d) {
                if(d.e) {
                    ctx.addError('request_version', d.e);
                    this.hasError = true;
                } else {
                    if(!this.hasError) {
                        ctx.addError('request_version', 'request_version');
                    }
                }
                if(after) {
                    after(true);
                }
            }
        };
        var pr = request_prepare(s, pr, o);
        var d = {t:42, p:o.p, x:pr.t, data:''};
        if(request(d, o)) {
            
        }
    }
    
    (function(){
        var c = $('#center .ui.runsel.dropdown');
        var b = $('#center .ui.runbtn.dropdown');
        var idx = -1;
        
        c.dropdown({
           transition: 'fade up',
           context: 'body',
           onChange: function(value, text, $choice) {
                idx = $(c[0].firstChild).children().index($choice[0]);
                b.children().first().text(polyglot.t('run.rmode') + text);
           }
        });
        
        sub.isActive = function() {
            return idx != 1;
        }
        
        _this.runSel = function() {
            c.css('margin-left', b.position().left + 'px');
            c.css('width', b.outerWidth(true) + 'px');
            c.click();
        };
        
        c.dropdown('set selected', polyglot.t('main.act'));
    })();
    
    
    function play() {
        return _this.updateCtrl(true);
    }
    
    function stop() {
        return _this.updateCtrl();
    }
    
    (function(){
        var bptn = $('#topbar .ui.play .item');
        var p = $(bptn[0]);
        var s = $(bptn[1]);
        var a = s;
        var sv = $('#topbar .runSavePos');
        
        sub.setCtrlView = function(i) {
            var t = i == 0 ? p : s;
            bptn.removeClass('sel');
            t.addClass('sel');
            a = t;
        }
        
        function t(e) {
            var t = $(e.target).closest('.item');
            var i = t[0] == p[0] ? 0 : 1;
            if(i == 0) {
                if(!play()) 
                    return;
            } else {
                if(!stop()) 
                    return;
            }
            sub.setCtrlView(i);
        }
        p.on('click', t);
        s.on('click', t);
        
        sub.setPlay = function(v) {
            if(v) {
                p.removeClass('inactive');
            } else {
                p.addClass('inactive');
            }
        }
        
        sub.setStop = function(v) {
            if(v) {
                s.removeClass('inactive');
            } else {
                s.addClass('inactive');
            }
        }
        
        sub.setSave = function(v) {
            if(v) {
                sv.removeClass('disabled');
            } else {
                sv.addClass('disabled');
            }
        }
        
        
    })();
    
    (function(){
        $('#center').css('display', 'none');
        $('#uses').css('display', 'none');
        $('#inst').css('display', 'none');
        
        var _ctx = {};
        var _sizes = [20, 20, 15, 25, 20];
        var _fill = [0, 10, 5, 5, 0];
        var _panes = ['#left', '#center', '#inst', '#right', '#uses'];
        
        sub.pane = function(i) {
            return _panes[i];
        }
        
        sub.split = function() {
            doSplit(_panes, _sizes, _ctx,  ['#left', '#inst', '#uses'], _fill);
        }
    
        sub.split();
    })();
    
    (function() {
        var rt = $('#right');
        var g = rt.find('.grid_c');
        var e = rt.find('.grid_e');
        var loader = loader_init(g);
        var lerr = error_init(g, polyglot.t('main.eh_load'), polyglot.t('run.e_load'));
        var serr = error_init(g, polyglot.t('main.eh_save'), polyglot.t('run.e_csave'));
        var i_data = null;
        
        hide_init(g);
        
        sub.setInstEmpty = function() {
            e.text(polyglot.t('main.list_empty'));
        };
        
        sub.setInstNoRun = function() {
            e.text(polyglot.t('run.norun'));
            sub.clearInst(true);
        };
        
        sub.getInst = function() {
            return i_data;
        };
        
        sub.sortInst = function() {
            i_data.d.sort(function(a, b) {
                return a.id - b.id;
            });
        };
        
        sub.loadInst = function(id) {
            if(id != null) {
                g.show();
                loader.show();
                post('/sys/server/', {data:JSON.stringify({cmd:88}), ext_data:JSON.stringify({id:id})}, function(d) {
                    do_visible_path(sub, function() { 
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.hide();
                        if(r.r == 0) {
                            r.id = id;
                            i_data = r;
                            sub.sortInst();
                            sub.resetInsts();
                        } else {
                            i_data = null;
                            lerr.show();
                        }
                        defer.ready();
                    });
                });
            } else {
                g.hide();
                defer.ready();
            }
        };
        
        sub.getInstEl = function() {
            return {g:g,l:loader,le:lerr,se:serr};
        };
        
        function destroy() {
            sub.deleteAllWidgets();
        };
        
        sub.renderWidget = function(pos, n) { 
            var i = pos[n.id] || {};
            var x = i.x || 0;
            var y = i.y || 0;
            var w = i.w || 2;
            var h = i.h || 2;
            return sub.addWidget(n.id, n.n, x, y, w, h);
        }
        
        sub.resetModules = function() {
            if(i_data.d.length == 0) {
                sub.setInstEmpty();
                g.hide();
            } else {
                g.show();
            }
        };
        
        sub.renderModules = function() {
            destroy();
            if(sel != null) {
                loader.show();
                defer.then(function() {
                    if(i_data.d.length == 0) {
                        sub.setInstEmpty();
                        g.hide();
                        deferRender.update(1);
                        deferRender.ready();
                    } else {
                        g.show();
                        var num = 0;
                        var cfg = sub.getCfg();
                        var pos = cfg.o.pos || {};
                        var hidx = 0;
                        var h = pos.h || [];
                        var hidden = function(id) {
                            var hid = h[hidx];
                            while(hid !== undefined && hid < id) {
                                hid = h[++hidx];
                            }
                            return hid === id;
                        }
                        i_data.d.forEach(function(n) {
                            if(hidden(n.id)) {
                                n.hidden = true;
                            }
                            if(pos.m === n.id) {
                                n.max = true;
                            }
                            if(!n.hidden) {
                                num++;
                                var ni = sub.renderWidget(pos, n);
                                ni.item = n;
                            }
                        });
                        if(pos.m !== undefined) {
                            var i = cont.find('.grid-stack-item[data-gs-id="' + pos.m + '"]');
                            ctx.maximize(i[0]);
                        }
                    }
                    deferRender.update(num);
                    deferList.ready();
                    loader.hide();
                });
            }
        };
    })();
    
    (function() {
        var ct = $('#center');
        var g = ct.find('.grid_c');
        var a = $('.runActiveFrm input');
        var sBtn = g.find('.button');
        var rId = g.find('#runId');
        var rName = g.find('#runName');
        var rDesc = g.find('#runDesc');
        var rUID = g.find('#runUID');
        var rGID = g.find('#runGID');
        var frm = $('.runActiveFrm');
        var st = sub.getInstEl().g;
        var loader = loader_init(g);
        var lerr = error_init(g, polyglot.t('main.eh_load'), polyglot.t('run.e_load'));
        var serr = error_init(g, polyglot.t('main.eh_save'), polyglot.t('run.e_csave'));
        
        var r_data = null;
        
        var ch = false;
        var wp = false;
        
        var oi = function() {
            if(wp && !ch) {
                ch = true;
                sBtn.attr('disabled', false);
            }
        };
        
        hide_init(g);
        
        rDesc.on('input', oi);
        rUID.on('input', oi);
        rGID.on('input', oi);
        
        sBtn.on('click', function() {
            var d = post_get_val(r_data,
                                ['n', 'd', 'u', 'g'],
                                ['c', 'a', 'n', 'o'],
                                [rName, rDesc, rUID, rGID]);
            if(d) { 
                loader.show();
                var c = d.c;
                d = d.r;
                var pd = {data:JSON.stringify({cmd:85})};
                d.m = sel;
                pd.ext_data = JSON.stringify(d);
                var sn = sel_name;
                post('/sys/server/', pd, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.hide();
                    if(r.r == 0) {
                        change.run_edit(d.m, sn, 2);
                        c();
                        ch = false;
                        sBtn.attr('disabled', true);
                    } else {
                        serr.show();
                    }
                });
            }
        });
        
        sub.getCfg = function() {
            return r_data;
        }
        
        var loadCfg = function(id) {
            sBtn.attr('disabled', true);
            if(id != null) {
                g.show();
                wp = false;
                ch = false;
                loader.show();
                post('/sys/server/', {data:JSON.stringify({cmd:82}), ext_data:JSON.stringify({id:id})}, function(d) {
                    do_visible_path(sub, function() { 
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        loader.hide();
                        if(r.r == 0) {
                            r.id = id;
                            do_visible_split(ct, function() {
                                label_set(rId, r.id);
                                label_set(rName, r.n);
                                label_set(rDesc, r.d);
                                label_set(rGID, r.g);
                                label_set(rUID, r.u);
                            });
                            r_data = r;
                        } else {
                            r_data = null;
                            lerr.show();
                        }
                        wp = true;
                        defer.ready();
                    });
                });
            } else {
                g.hide();
                clear_visible_split(ct);
                defer.ready();
            }
        }
        
        _this.onChangeMode = function(m) {
            if(mode !== m) {
                mode = m;
                deferRender.reset();
                deferRender.update(1);
                _this.updateActive();
                if(cont) {
                    if(m == 1) {
                        cont.removeClass('config');
                    } else {
                        cont.addClass('config');
                    }
                    sub.setWidgetMode(m);
                } else {
                    deferRender.ready();
                }
            }
        };
        
        var num_probes = 0;
        var run;
        var lbl = $('#topbar .ui.play .plbl');
        _this.updatePending = function() {
            lbl.text(num_probes == 0 ? '' : num_probes);
        }
        
        var _spCtx = {};
        _this.startProbes = function(rid, rst) {
                _spCtx.stopped = true;
                var spCtx = _spCtx = {};
                var compile = {};
                var pending = [];
                var deferCompile = defer_init(1);
                deferCompile.ready();
                var active = sub.isActive();
                
                probes_each(function(k, v) {
                    if(v.run != run) {
                        var kversion = v.kv;
                        var machine = v.m;
                        var key = kversion + '/' + machine;
                        var c = compile[key];
                        v.run = run;
                        num_probes++;
                        _this.updatePending();
                        if(!c) {
                            (function() {
                                var flags;
                                var ci = c = compile[key] = {k:kversion, m:machine, d:defer_init(1)};
                                var f = function(err) {
                                    if(err) {
                                        return;
                                    }
                                    deferCompile.reset();
                                    request_compile(rid, kversion, machine, flags, function(err) {
                                        deferCompile.ready(flags != 0 && err);
                                        ci.d.ready(err);
                                    });
                                };
                                if(rst) {
                                    rst = undefined;
                                    flags = 2;
                                    f(false);
                                } else {
                                    pending.push(f);
                                    deferCompile.then(function(err) {
                                        pending.pop()(err);
                                    });
                                }
                            })();
                        }
                        
                        (function() {
                            var pk = v;
                            c.d.then(function(err) {
                                var after = function(err) {
                                    if(num_probes-- < 0) {
                                        num_probes = 0;
                                    }
                                    _this.updatePending();
                                };
                                if(!err && !spCtx.stopped) {
                                    if(active) {
                                        request_run(rid, parseInt(k), pk, 0, after);
                                    } else {
                                        request_attach(rid, 1, after);
                                    }
                                    
                                    
                                } else {
                                    after();
                                }
                            }); 
                        })();
                    }
                });
        }
        
        var _active = null;
        _this.getActive = function() {
            return _active;
        }
        
        _this.updateCtrl = function(v) {
            if(v) {
                if(sel == null) {
                    return false;
                }
                
                module_cache_unset();
                
                run = {};
                _active = sel;
                var rst = _need_reset[_active] ? 1 : 0;
                delete _need_reset[_active];
                change.run_start(_active, sel_name);
                _this.updateActive();
                _this.onChangeActive({n:sel_name});
                _this.startProbes(_active, rst);
            } else {
                if(_active == null) {
                    return false;
                }
                if(sub.isActive()) {
                    request_stop();
                } else {
                    request_attach(-1, 0, function(err) {
                    });
                }
                
                _active = null;
                _this.onChangeActive();
            }
            
            _this.updateCtrlView();
            
            return true;
        }
        
        _this.updateCtrlView = function() {
            sub.setSave(sel != null);
            sub.setPlay(_active == null || sel != _active);
            sub.setStop(_active != null);
            
            sub.setCtrlView(_active == null || sel != _active ? 1 : 0);
        }
        
        _this.onChangeActive = function(o) {
            var l = $(frm.children()[0]);
            if(o) {
                a.val(o.n);
                l.addClass('fl-is-active');
                frm.css('margin-top', '0.4rem');
            } else {
                a.val('');
                l.removeClass('fl-is-active');
                frm.css('margin-top', '');
            }
        }
        
        _this.updateActive = function() {
            if(sel == _active && mode == 1) {
                deferRender.then(function() {
                    module_cache_share();
                });
            } else {
                module_cache_unshare();
            }
        }
        
        _this.onChangeRun = function(o) {
            var sn = {name:polyglot.t('run.norun')};
            sub.resetMax();
            deferRender.reset();
            if(o) {
                sn.name = o.n;
                sel = o.id;
                sel_name = o.n;
                sub.requestUses();
                st.show();
                _this.updateActive();
            } else {
                sel = null;
                sub.clearUses();
                st.hide();
                sub.setInstNoRun();
                module_cache_unshare();
            }
            _this.updateClear();
            deferList.reset();
            defer.reset();
            loadCfg(sel);
            sub.loadInst(sel);
            sub.renderModules();
            cfgLabel.innerText = polyglot.t('run.option_s', sn);
            _this.updateCtrlView();
        };
    })();
    
    (function(){
        var c = $('#topbar .ui.config.dropdown');
        var m = c.find('.menu');
        c.dropdown({
           transition:'fade up',
           context:'body',
           onChange:function(value, text, $choice) {
               c.children().first().text(polyglot.t('run.view_p') + text);
               _this.onChangeMode(m.children().index($choice[0]));
           }
        });
        
        c.dropdown('set selected', polyglot.t('run.view_r'));
    
    })();

    (function() {
        var l = $('.runList');
        var p = $('.runPage');
        var n = {page:'main/run',
                 sub:'run',
                 pg:'sub.requestRuns(p)',
                 kd:'sub.requestRuns(parseInt(this.value)-1, event)'
        };
        
        var nl = 0;
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, _this.onChangeRun);
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>';
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append(m(v));
            });
            paging_render(function() {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.onAddRun = function(d) {
            if(l.find('.item').length == 0) {
                l.html('');
            }
            l.prepend(m(d));
            j(l.children().first());
        }
        
        sub.resetRuns = function() {
            paging_reset(n);
            sub.requestRuns();
        }
        
        var s = list_search(rFilter, sub.resetRuns);
        
        sub.lockList = function() {
            if(nl == 0) {
                rFilter.attr('disabled', '');
                l.addClass('nomouse_i');
                p.addClass('nomouse');
            }
            nl++;
        }
        
        sub.unlockList = function() {
            nl--;
            if(nl == 0) {
                rFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
                p.removeClass('nomouse');
            }
        }
        
        sub.requestRuns = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            _this.onChangeRun();
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i}));
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:81}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        var rm = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('run.rem', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
            };
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('run.e_rem'), function(r) { 
                    r.remove();
                    sub.unlockList();
                });
                loader.show();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:86}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        change.run_edit(o.id, o.n, 1);
                        it.remove();
                        serr.remove();
                        sub.unlockList();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        };
        
        var rn = function(o, it) {
            sub.lockList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('run.ren', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="groupRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="groupRName" name="groupRName" class="ui input" value="' + o.n + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('run.e_ren'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockList(); 
                });
                loader.show();
                var nn = d.val();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:85}), ext_data:JSON.stringify({m:o.id, c:nn})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        change.run_edit(o.id, nn, 2);
                        o.n = nn;
                        it.replaceWith(m(o))
                        serr.remove();
                        sub.unlockList(); 
                        lb.destroy();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        }
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.runList .item', 
            callback:function(key, options) {
                if(key != 'addm') {
                    _this.onChangeRun();
                    j();
                }
                switch(key) {
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'addm':
                        _this.runAddModule(this.o);
                        break;
                }
            },
            items:{
                'addm':{name:polyglot.t('run.addm'), icon:'add'},
                'rename':{name:polyglot.t('main.ren'), icon:'edit'},
                'remove':{name:polyglot.t('main.rem'), icon:'delete'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
    })();
    
    (function() {
        var u = $('#inst');
        var l = $('.runIList');
        var iDir = iFilter.parent().find('.toggl');   
        var nl = 0;
        
        function filter() {
            var items = sub.getInst().d;
            var f = iFilter.val();
            var d = iDir.hasClass('up') ? 1 : 0;
            var r = f != '' ? items.filter(function(n) {
               return n.n.indexOf(f) != -1; 
            }) : items.slice(0);
            
            r.sort(function(a, b) {
                var n = a.n.localeCompare(b.n);
                return d == 1 ? n : -n; 
            }); 
            
            return r;
        }
        
        var j = list_select(l, function(it) {
            return {id:parseInt(it.attr('n')), n:it.find('.text').text()};
        }, function() {});
        
        var m = function(v) {
            return '<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>';
        };        
        
        sub.lockIList = function() {
            if(nl == 0) {
                iFilter.attr('disabled', '');
                l.addClass('nomouse_i');
            }
            nl++;
        }
        
        sub.unlockIList = function() {
            nl--;
            if(nl == 0) {
                iFilter.attr('disabled', null);
                l.removeClass('nomouse_i');
            }
        }
        
        var render = function(d) {
            deferList.then(function() {
                var f = $(document.createDocumentFragment());
                var i = d.d || [];
                i.forEach(function(v) {
                    var k = $(m(v)).appendTo(f);
                    if(v.hidden) {
                        k.addClass('_hidden');
                    }
                    if(v.max) {
                        k.addClass('_max');
                    }
                });
                l.html('');
                l.append(f);
            });
        }
        
        sub.clearInst = function(v) {
            clear_visible_split(u);
            l.html('<div class="list_e">' + polyglot.t(v ? 'run.norun' : 'main.list_empty') + '</div>');
        }
        
        sub.resetInsts = function() {
            j();
            var d = sub.getInst();
            if(!d || d.d.length == 0) {
                sub.clearInst(d == null);
            } else {
                render({d:filter()});
            }
        }
        
        var s = list_search(iFilter, sub.resetInsts);
        
        var hd = function(o, it) {
            if(it.hasClass('_hidden')) {
                var d = sub.getInst();
                var cfg = sub.getCfg();
                var pos = cfg.o.pos || {};
                var it = d.d.find(function(n) {
                    return n.id == o.id;
                });
                var ni = sub.renderWidget(pos, it);
                ni.item = it;
                delete ni.item.hidden;
                sub.resetInsts();
            } else {
                var i = cont.find('.grid-stack-item[data-gs-id="' + o.id + '"]');
                ctx.close(i);
            }
        }
        
        var mx = function(o, it) {
            var i = cont.find('.grid-stack-item[data-gs-id="' + o.id + '"]');
            ctx.maximize(i);
        }
        
        var rn = function(o, it) {
            sub.lockIList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="ui form form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('run.renI', {name:o.n}) + 
                                '</span></div>' +
                                '<div class="form-row"><label for="groupRName">' + 
                                polyglot.t('main.name') + 
                                '</label><input type="text" id="groupRName" name="groupRName" class="ui input" value="' + o.n + '"></div>' +
                                '<div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                       
		    var lb = new FloatLabels(it[0], {'style':1, customEvent:autofill});
		    var d = it.find('input');
		    d.focus();
		    
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockIList();
                lb.destroy();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_save'), polyglot.t('run.e_renI'), function(r) {
                    r.remove(); 
                    lb.destroy();
                    sub.unlockIList(); 
                });
                loader.show();
                var nn = d.val();
                lock.post('/sys/server/', {data:JSON.stringify({cmd:91}), ext_data:JSON.stringify({m:o.id, a:nn})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        o.n = nn;
                        it.replaceWith(m(o))
                        serr.remove();
                        sub.unlockIList(); 
                        lb.destroy();
                        var dit = sub.getInst().d.find(function(n) {
                            return n.id == o.id;
                        });
                        dit.n = nn;
                        sub.renderModules();
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        };
        
        var rm = function(o, it) {
            sub.lockIList();
            var cl = function(c) {
                return "\"var t = this;(function(){var ctx=getCtx('main/run'),sub=ctx['run'],f=function(event) { " + c + " };f.call(t, event)})()\""; 
            };
            
            it = it.replaceFrom('<div class="item noselect frame"><div class="form-base"><div class="content mouse">' +
                                '<div class="form-row" style="padding:1em 0;"><span class="text">' + polyglot.t('run.remI', {name:o.n}) + 
                                '</span></div><div class="form-row"><div style="float:right;display:inline-block;">' + 
                                '<button class="ui blue deny button" onclick=' + cl('sub.abort();') + '>' +
                                polyglot.t('dialog.cancel')
                                + '</button><button class="ui blue accept button" onclick=' + cl('sub.submit();') + '>' +
                                polyglot.t('dialog.accept')
                                + '</button></div></div></div></div></div>');
                                
            sub.abort = function() {
                it = it.replaceFrom(m(o), 'active');
                j.reset(it);
                sub.unlockIList();
            };
            
            sub.submit = function() {
                var loader = loader_init(l);
                var serr = error_init(l, polyglot.t('main.eh_rem'), polyglot.t('run.e_remI'), function(r) { 
                    r.remove();
                    sub.unlockIList();
                });
                loader.show();
                var rid = sel;
                lock.post('/sys/server/', {data:JSON.stringify({cmd:90}), ext_data:JSON.stringify({id:o.id})}, function(d) {
                    var r = d.constructor === String ? JSON.parse(d) : d;
                    loader.remove();
                    if(r.r == 0) {
                        it.remove();
                        serr.remove();
                        sub.unlockIList();
                        
                        var di = sub.getInst().d;
                        var dit = di.find(function(n) {
                            return n.id == o.id;
                        });
                        var idx = di.indexOf(dit);
                        di.splice(idx, 1);
                        sub.renderModules();
                        _need_reset[rid] = true;
                    } else {
                        it.replaceWith(m(o));
                        serr.show();
                    }
                });
            };
        };
        
        $.contextMenu({
            zIndex: 103,
            appendTo:'#content',
            selector:'.runIList .item', 
            className:'runIListC',
            callback:function(key, options) {
                j();
                switch(key) {
                    case 'hide':
                        hd(this.o, this.it);
                        break;
                    case 'max':
                        mx(this.o, this.it);
                        break;
                    case 'rename':
                        rn(this.o, this.it);
                        break;
                    case 'remove':
                        rm(this.o, this.it);
                        break;
                }
            },
            items:{
                'hide':{name:polyglot.t('main.hide'), icon:'edit'},
                'max':{name:polyglot.t('main.max'), icon:'edit', disabled:function(){
                    return this.it.hasClass('_hidden');
                }},
                'rename':{name:polyglot.t('main.ren'), icon:'edit'},
                'remove':{name:polyglot.t('main.rem'), icon:'delete'}
            },
            events:{
                show:function(options){
                    var it = $(this[0]).closest('.item');
                    this.o = j.temp(it);
                    this.it = it;
                    return !it.hasClass('noselect');
                },
                hide:function() {
                    this.o = null;
                    this.it = null;
                    j.reset();
                }
            }
        });
        
        l.on('contextmenu', function(e){
            var it = $(e.target).closest('.item');
            var c = $('.context-menu-list.context-menu-root.runIListC')[0].childNodes;
            $(c[0]).find('span').text(polyglot.t(it.hasClass('_hidden') ? 'main.show' : 'main.hide'));
            $(c[1]).find('span').text(polyglot.t(it.hasClass('_max') ? 'main.min' : 'main.max'));
        }); 
        
        sub.clearInst(true);
    })();
    
    (function() {
        var u = $('#uses');
        var l = $('.usesList');
        var p = $('.usesPage');
        var n = {page:'main/run',
                 sub:'run',
                 pg:'sub.requestUses(p)',
                 kd:'sub.requestUses(parseInt(this.value)-1, event)'
        };
        
        var render = function(d) {
            var f = $(document.createDocumentFragment());
            var i = d.d || [];
            i.forEach(function(v) {
                f.append('<div class="item" n="' + v.id + '"><div class="content"><span class="text">' + v.n + '</span></div></div>');
            });
            paging_render(function(n) {
                l.append(f);
            }, l, p, n, n.po, d);
        }
        
        sub.clearUses = function() {
            clear_visible_split(u);
            paging_reset(n);
            p.html('');
            l.html('<div class="list_e">' + polyglot.t('run.norun') + '</div>');
        }
        
        sub.resetUses = function() {
            paging_reset(n);
            sub.requestUses();
        }
        
        var s = list_search(uFilter, sub.resetUses);
        
        var ru = function(po, ev) {
            if(ev && ev.keyCode != 13) {
                return;
            }
            paging_render(function(n) {
                if(n.iv) {
                    var d = JSON.stringify(s({i:n.i,p:(n.po || 0)*n.i,id:sel}));
                    uFilter.attr('disabled', '');
                    l.addClass('nomouse_i');
                    p.addClass('nomouse');
                    lock.post('/sys/server/', {data:JSON.stringify({cmd:87}), ext_data:d}, function(d) {
                        var r = d.constructor === String ? JSON.parse(d) : d;
                        uFilter.attr('disabled', null);
                        l.removeClass('nomouse_i');
                        p.removeClass('nomouse');
                        s();
                        do_visible_path(sub, function() { render(r); });
                    });
                }
            }, l, p, n, po);
        }
        
        sub.requestUses = function(po, ev) {
            do_visible_split(u, function() {
                ru(po, ev)
            });
        }
    })();
    
    (function() {
        var _max = null;
        var controller = {widgets:function() {return [];}};
        var soptions = {
                            auto:false,
                            draggable:{
                                handle:'.label.tov',
                            },
                            resizable:{
                                handles:'e, se, s, sw, w'
                            },
                            verticalMargin:'10px',
                            float:true
                        };  
                        
        sub.resetMax = function() {
            _max = null;
            cont.removeClass('maxed');
        }
        
        ctx.maximize = function(el, rorender) {
            var p = $(el).closest('.grid-stack-item');
            var icon = p.find('.grid-stack-item-content > .top.label .icon.caret');
            var max = p.hasClass('maxed');
            var it = ko.dataFor(p[0]);
            if(_max != null) {
                var i = cont.find('.grid-stack-item[data-gs-id="' + _max + '"]');
                _max = null;
                ctx.maximize(i[0], true);
            }
            if(!it) {
                return;
            }
            
            if(max) {
                icon.removeClass('down');
                icon.addClass('up');
                p.removeClass('maxed');
                cont.removeClass('maxed');
                _max = null;
                delete it.item.max;
            } else {
                icon.removeClass('up');
                icon.addClass('down');
                p.addClass('maxed');
                cont.addClass('maxed');
                cont.scrollTop(0);
                _max = it.id;
                it.item.max = true;
            }
            if(!rorender) {
                sub.resetInsts();
            }
            grid.movable(p[0], max && mode == 0);
            grid.resizable(p[0], max && mode == 0);
            
            if(!rorender) {
                module_resized(it.id);
            }
        }
        
        ctx.close = function(el) {
            var p = $(el).closest('.grid-stack-item');
            var data = ko.dataFor(p[0]);
            if(data.id == _max) {
                var i = cont.find('.grid-stack-item[data-gs-id="' + _max + '"]');
                ctx.maximize(i[0]);
            }
            data.item.hidden = true;
            sub.deleteWidget(data);
            sub.resetInsts();
        }
        
        sub.sync = function() {
            var g = $('.container-fluid .grid-stack');
            g[0].childNodes.forEach(function(el) {
                var e = $(el);
                var data = ko.dataFor(el);
                data.x = parseInt(e.attr('data-gs-x'));
                data.y = parseInt(e.attr('data-gs-y'));
                data.width = parseInt(e.attr('data-gs-width'));
                data.height = parseInt(e.attr('data-gs-height'));
            });
        };
        
        sub.savePos = function() {
            console.log('save');
            var pos = {};
            var els = sub.getInstEl();
            var loader = els.l;
            var serr = els.se;
            loader.show();
            sub.sync();
            
            var i = sub.getInst();
            var a = [].slice.call(controller.widgets(), 0);
            a.sort(function(a, b) {
                return a.id - b.id;
            });
            var iidx = 0;
            var h = [];
            var check = function(id) {
                var n = i.d[iidx];
                while(n && n.id != id) {
                    h.push(n.id);
                    n = i.d[++iidx];
                }
                iidx++;
            };
            a.forEach(function(item) {
                var id = item.id;
                var i = pos[id];
                if(!i) {
                    i = pos[id] = {};
                }
                i.x = item.x;
                i.y = item.y;
                i.w = item.width;
                i.h = item.height;
                check(id);
            });
            check(null);
            
            var c = sub.getCfg();
            c.o.pos = pos;
            
            if(_max != null) {
               pos.m = _max; 
            }
            
            if(h.length != 0) {
                pos.h = h;
            }
            
            post('/sys/server/', {data:JSON.stringify({cmd:85}), ext_data:JSON.stringify({m:sel,b:JSON.stringify(c.o)})}, function(d) {
                var r = d.constructor === String ? JSON.parse(d) : d;
                if(r.r == 0) {
                    
                } else {
                    serr.show();
                }
                loader.hide();
            });
        };
        
        var templ = $('#gridstack-template');
        cont = $('.stack-container');
        templ[0].parentNode.removeChild(templ[0]);
        _this.onChangeMode(mode);
        
        sub.updateWidgetMode = function(i, m, after) { 
            deferList.then(function() {
                var maxed = cont.hasClass('maxed');
                var data = ko.dataFor(i).item;
                var ct = $(i).find('.grid-stack-item-content > .content');
                ct.addClass('run_' + data.id);
                
                grid.movable(i, !maxed && m == 0);
                grid.resizable(i, !maxed && m == 0);
                
                var mode = m + 4;
                var d = JSON.stringify({a:data.mid,b:mode});
                
                if(i.unload) {
                    i.unload();
                    i.unload = null;
                }
                var key = moduleCache.genKey(data.mid, mode);
                moduleCache.get(key, function(f) {
                    //loader.show();
                    lock.raw_post('/sys/server/', {data:JSON.stringify({cmd:70}), ext_data:d}, f);
                }).then(function(d, err) {
                    //loader.hide();
                    key = '/' + data.id + key;
                    if(!err) {
                        i.unload = function() {
                            moduleCache.unload(key);
                        };
                        if(after){
                            after.ready()
                        }
                    }
                    do_visible_path(sub, function() {
                        var after = function() {
                            deferRender.ready();
                        }
                        if(err) {
                            //serr.show();
                            after();
                        } else {
                            moduleCache.load(key, d, ct, {prefix:'.run_' + data.id + ' ', ty:mode - 3, rid:data.id, iid:data.iid}).then(after);
                        }
                    });
                });
                
            });
        };
    
        ko.components.register('dashboard-grid', {
            viewModel: {
                createViewModel: function (controller, componentInfo) {
                    grid = $('.container-fluid .grid-stack').gridstack(soptions).data('gridstack');
                    var ViewModel = function (controller, componentInfo) {
                        this.widgets = controller.widgets;
                        this.afterAddWidget = function (items) {
                            var item = items.find(function (i) { return i.nodeType == 1 });
                            grid.addWidget(item);
                            var added = defer_init(1);
                            deferAdd.then(function() {
                                sub.updateWidgetMode(item, mode, added);
                            });
                            ko.utils.domNodeDisposal.addDisposeCallback(item, function () {
                                grid.removeWidget(item);
                                added.then(function() {
                                    item.unload();
                                });
                            });
                        };
                    };
                    return new ViewModel(controller, componentInfo);
                }
            },
            template: { element: templ[0] }
        });
        
        $(function () {
            var Controller = function (widgets) {
                var self = this;
                this.widgets = ko.observableArray(widgets);
                this.addWidget = function (id, lbl, x, y, width, height, apos) {
                    var it = {
                        id:id,
                        lbl:lbl,
                        x:x,
                        y:y,
                        width:width,
                        height:height,
                        auto_position:apos === undefined ? false : apos
                    };
                    self.widgets.push(it);
                    
                    return it;
                };
                this.deleteWidget = function (item) {
                    self.widgets.remove(item);
                    return false;
                };
                this.deleteAll = function () {
                    self.widgets.removeAll();
                    return false;
                };
            };
            controller = new Controller([]);
            ko.applyBindings(controller, cont[0]);
            sub.addWidget = controller.addWidget;
            sub.deleteWidget = controller.deleteWidget;
            sub.deleteAllWidgets = controller.deleteAll;
            sub.setWidgetMode = function(m) {
                controller.widgets().forEach(function(w) {
                    var i = cont.find('.grid-stack-item[data-gs-id="' + w.id + '"]');
                    sub.updateWidgetMode(i[0], m);
                });
            }
            
            do_visible_split($('#left'), function() {
                sub.requestRuns();
            });
        });
        
        $(document).one('cacheDestroy', function() {
            $(document).off('tmplChange', sub.tmplChange);
            $(document).off('probeChange', sub.onProbeChange);
            ko.removeNode(cont[0]);
            ko.components.unregister('dashboard-grid');
        });
    })();
 });addTmpl("main/welcome", "content",{"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div><div class=\"ui stackable grid wGrid load\"><div class=\"eight wide column\"><table class=\"ui small very compact unstackable selectable table\"><thead><tr><th colspan=\"2\" ln=\"wlcm.run\"></th></tr></thead><tbody></tbody></table><div class=\"ui secondary segment\"><div class=\"ui grey small horizontal\"><h3 class=\"label\">"
    + container.escapeExpression((helpers.l || (depth0 && depth0.l) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"wlcm.pact",{"name":"l","hash":{},"data":data}))
    + "<label class=\"wlcm_num\" style=\"float:right;\"></label></h3></div></div><table class=\"ui small very compact unstackable selectable table\"><thead><tr><th colspan=\"2\" ln=\"wlcm.probe\"></th></tr></thead><tbody></tbody></table><table class=\"DISASSEMBLER_USE ui small very compact unstackable selectable table\"><thead><tr><th colspan=\"2\" ln=\"wlcm.dism\"></th></tr></thead><tbody></tbody><thead><tr><th colspan=\"2\" ln=\"wlcm.src\"></th></tr></thead><tbody></tbody></table></div><div class=\"eight wide column\"><div class=\"ui secondary segment\"><div class=\"ui grey small horizontal\"><h3 class=\"label wlcm_lbl\"></h3></div></div><table class=\"ui small very compact unstackable selectable table\"><thead><tr><th colspan=\"2\" ln=\"wlcm.module\"></th></tr></thead><tbody></tbody></table><table class=\"CHAT_USE ui small very compact unstackable selectable table\"><thead><tr><th colspan=\"2\" ln=\"wlcm.chat\"></th></tr></thead><tbody></tbody></table><table class=\"USER_EDIT ui small very compact unstackable selectable table\"><thead><tr><th colspan=\"2\" ln=\"wlcm.user\"></th></tr></thead><tbody></tbody></table></div></div></div>";
},"useData":true},"");addS("main/welcome", "_sid1","\n    .wGrid .ui.table th {\n        cursor:pointer;\n    }\n    \n    .wGrid .ui.table.closed th,\n    .wGrid .ui.table th.empty {\n        border-radius:0.28571429rem !important;\n    }\n    \n    .wGrid .ui.table td:last-child {\n        text-align:right;\n    }\n    \n    div.ui.wGrid  {\n        padding:10px;\n        width:100%;\n        margin-left:0;\n    }\n\n    .wGrid .column > div {\n        margin: 1em 0em;\n    }\n\n    .wGrid .column > div:first-child {\n        margin-top: 0em;\n    }\n");addJ("main/welcome","welcome",function(ctx, path, sub) { 

    (function() {
        var grid = ctx.grid = $('.wGrid');
        var tables = $('.wGrid table');
        var tidx = ctx.tidx = ['run', 'probe', 'dasm', 'src', 'module', 'chat', 'user'];
        var _tables = {};
        sub.getTables = function() { return _tables; };
        
        var ctable_init = function(t, ctx) {
            t = $(t);
            var h = t.find('thead');
            var b = t.find('tbody');
            var th = h.find('th');
            var o = true;
            var lbl =$('<label></label>').appendTo(th);
            var btn = $('<i class="icon caret up" style="float:right;"></i>').appendTo(th);
            lbl.each(function(i, it) { 
                var toggle = function(s, v, after) {
                    if(v !== undefined && v != o) {
                        return;
                    }
                    s = s.constructor === String ? s : 'fast';
                    if(o) {
                        b.fadeOut(s, function() {
                            domy.off(function() {
                                btn.removeClass('up');
                                btn.addClass('down');
                                t.addClass('closed');
                                if(after) {
                                    after();
                                }
                            });
                        });
                    } else {
                        domy.off(function() {
                            t.removeClass('closed');
                        });
                        b.fadeIn(s);
                        btn.addClass('up');
                        btn.removeClass('down');
                    }
                    o = !o;
                }; 
                var s = function(v) {
                    $(th[i]).off('click', toggle);
                    if(v) {
                        $(th[i]).removeClass('empty');
                        $(th[i]).css('cursor', '');
                        $(btn[i]).css('display', '');
                        $(th[i]).on('click', toggle);
                    } else {
                        $(th[i]).addClass('empty');
                        $(th[i]).css('cursor', 'initial');
                        $(btn[i]).css('display', 'none');
                    }
                };
                var ln = $(th[i]).attr('ln');
                $(it).text(polyglot.t(ln, {num:0}));
                s(false);
                _tables[tidx[ctx.j++]] = {t:$(b[i]), l:$(it), ln:ln, s:s};
                toggle('fastest', true);
            });
        };
        
        var tctx = {j:0};
        tables.each(function(i, it) { 
            ctable_init(it, tctx);
        });
    })();

    (function() {
        var tidx = ctx.tidx;
        var user = $('.wGrid .wlcm_lbl');
        var num_probes = $('.wGrid .wlcm_num');
        var tables = sub.getTables();
        var max = 5;
        
        sub.onProbeChange = function() {
            num_probes.text(probes_count());
        }
        sub.onNameChange = function() {
            user.text(polyglot.t('wlcm.wlcm', {name:login_get_name()}));
        }
        
        var _changes = {};
        
        tidx.forEach(function(it) { _changes[it] = null; });
        
        var dmf = function(v) {
            var t = new Date(parseInt(v) * 1000);
            return date_format(t, true);
        }
        
        sub.onWlcmChange = function(e, d, c, fkt) {
            var go = function(t, f) {
                if(c[t] != _changes[t]) {
                    _changes[t] = c[t];
                    var tb = tables[t];
                    var tbl = tb.t;
                    var lbl = tb.l;
                    var ln = tb.ln;
                    var values = fkt.sort(d[t]);
                    tbl.html('');
                    lbl.text(polyglot.t(ln, {num:values.length > max ? max : values.length}));
                    tb.s(values.length != 0);
                    values.forEach(function(it, i) {
                        if(i < max) {
                            f.call(values, tbl, it);
                        }
                    });
                }
            }
            go('run', function(t, it) {
                $('<tr><td>' + it.n + '</td><td>' + dmf(it.t) + '</td></tr>').appendTo(t);
            });
            go('probe', function(t, it) {
                $('<tr><td>' + it.n + '</td><td>' + dmf(it.t) + '</td></tr>').appendTo(t);
            });
            go('dasm', function(t, it) {
                $('<tr><td>' + it.key + '</td><td>' + dmf(it.t) + '</td></tr>').appendTo(t);
            });
            go('src', function(t, it) {
                $('<tr><td>' + it.key + '</td><td>' + dmf(it.t) + '</td></tr>').appendTo(t);
            });
            go('module', function(t, it) {
                $('<tr><td>' + it.n + '</td><td>' + dmf(it.t) + '</td></tr>').appendTo(t);
            });
            go('chat', function(t, it) {
                $('<tr><td>' + it.n + '</td><td>' + dmf(it.t) + '</td></tr>').appendTo(t);
            });
            go('user', function(t, it) {
                $('<tr><td>' + it.n + '</td><td>' + dmf(it.t) + '</td></tr>').appendTo(t);
            });
        };
        
        $(document).on('probeChange', sub.onProbeChange);
        $(document).on('nameChange', sub.onNameChange);
        $(document).on('wlcmChange', sub.onWlcmChange);
        
        sub.onProbeChange();
        sub.onNameChange();
        
        change.update(null, function() {
            
        });
    })();
    
    $(document).one('cacheDestroy', function() {
        $(document).off('probeChange', sub.onProbeChange);
        $(document).off('nameChange', sub.onNameChange);
        $(document).off('wlcmChange', sub.onWlcmChange);
    });
 });addS("main", "_sid0","\n    body {\n        background-color:#F6F5FD !important;\n    }\n    \n    div.ui  .smallmenu {\n        height:0px !important;\n    }\n \n    .smallbar {\n        padding-left:60px !important;\n        margin-left:0px;\n    }\n    \n    .noleft {\n        padding-left:0px !important;\n        margin-left:0px;\n    }\n    \n    .displaynone {\n        display:none !important;\n    }\n    \n    .displayblock {\n        display:block !important;\n    }\n    \n    #main > .sidebar .item i {\n        font-size:24px;\n        margin-top:-5px !important;\n    }\n    \n    .logo {\n        height:48px !important;\n        padding:8px !important;\n        text-align:center;\n    }\n    \n    .logo img {\n        width:38px !important;\n        height:38px !important;\n    }\n    \n    .title.item {\n        padding:.92857143em 1.14285714em !important;\n    }\n    \n    .dropdown .menu .header {\n        padding-top:3.9px !important;\n        padding-bottom:3.9px !important;\n    }\n    \n    .bigov {\n         overflow:auto;\n         height:calc(100% - 48px); \n    }\n    \n    .fheight {\n        height:100vh;\n        padding-top:51px;\n    }\n\n    #main > .fixed.menu {\n        height:48px !important;\n    }\n    \n    .sb-test {\n    \tposition:absolute;\n    \toverflow:scroll;\n    \ttop:-99999px;\n    \twidth:200px;\n    \theight:200px;\n    }\n    \n    .sgrid .gutter-vertical {\n        cursor:ns-resize;\n        width:100%;\n    }\n    \n    .sgrid .gutter-vertical:after {   \n        content:\"\";\n        position:relative;\n        display:block;\n        width:20px;\n        height:4px;\n        border:solid 1px #BBB;\n        background-color:white;\n        left:50%;\n    }\n    \n    .sgrid .gutter-horizontal {\n        float:left;\n        cursor:ew-resize;\n        height:100%;\n        \n    }\n    \n    .sgrid .gutter-horizontal:after {   \n        content:\"\";\n        position:relative;\n        display:block;\n        width:4px;\n        height:20px;\n        border:solid 1px #BBB;\n        background-color:white;\n        -webkit-transform:translateX(0px) translateY(-50%);\n        -ms-transform:translateX(0px) translateY(-50%);\n        transform:translateX(0px) translateY(-50%);\n        top:50%;\n    }\n        \n    .sgrid {\n        height:100%;\n    }\n\n    .ui .sgrid > div {\n        float:left;    \n        height:100%;\n        margin:0;\n        padding:0;\n    }\n");addJ("main","",function(ctx, path, sub) { 
    var _socket;
    var _socket_pending = null;
    var w = window;
    var _mctx;
    var _mprefix;
    var _chatMsgs = [];
    var _eperms = {
        RUN_EDIT:               1 << 0,
        PROBE_EDIT:             1 << 1,
        PROBE_VIEW_KEY:         1 << 2,
        MODULE_EDIT:            1 << 3,
        MODULE_SOURCE_EDIT:     1 << 4,
        MODULE_SETUP:           1 << 5,
        REPO_EDIT:              1 << 6
    };
    
    (function() {
        var tidx = ['run', 'probe', 'dasm', 'src', 'module', 'chat', 'user'];
        var kty =  [0,     0,       1,      1,      0,       1,      0];
        var fkt = {};
        fkt.size = window.Map ? function(o) {
            return o.size;
        } : function(o) {
            return Object.getOwnPropertyNames(o).length;
        }
        
        fkt.im = window.Map ? function() {
            return  new Map();
        } : function() {
            return {};
        }
        
        fkt.set = window.Map ? function(m, k, v) {
            m.set(k, v);
        } : function(m, k, v) {
            m[k] = v;
        }
        
        fkt.unset = window.Map ? function(m, k) {
            m.delete(k);
        } : function(m, k) {
            delete m[k];
        }
        
        fkt.get = window.Map ? function(m, k) {
            return m.get(k);
        } : function(m, k) {
            return m[k];
        }
        
        fkt.sort = function(o) {
            var values = [];
            var f = function(it) {
                var k = $.extend({}, this.get(o, it));
                k.key = it;
                values.push(k);
            };
            if(window.Map) {
                var keys = o.keys();
                while(true) {
                    var k = keys.next();
                    if(!k.done) {
                        f.call(this, k.value);
                    } else {
                        break;
                    }
                }
            } else {
                var keys = Object.getOwnPropertyNames(o);
                keys.forEach(f);
            }
            values.sort(function(a, b) {
                return b.t - a.t;
            });
            return values;
        }
        
        fkt.rm = function(o, max) {
            if(this.size(o) > max) {
                var values = [];
                var f = function(it) {
                    var k = $.extend({}, this.get(o, it));
                    k.key = it;
                    values.push(k);
                };
                if(window.Map) {
                    var keys = o.keys();
                    while(true) {
                        var k = keys.next();
                        if(!k.done) {
                            f.call(this, k.value);
                        } else {
                            break;
                        }
                    }
                } else {
                    var keys = Object.getOwnPropertyNames(o);
                    keys.forEach(f);
                }
                values.sort(function(a, b) {
                    return b.t - a.t;
                });
                this.unset(o, values[values.length-1].key);
            }
        }
        
        _welcome_change = {
            _max:10,
            _data : {},
            _changes : {},
            _time : function() {
                return Math.floor(Date.now() / 1000);
            },
            _pending : false,
            _change : function(n) {
                this._changes[n] = {};  
            },
            _stringify : function() {
                return JSON.stringify(this._data, function(n, v) {
                    var r = v;
                    if(v) {
                        if(v.constructor === window.Map) {
                            r = {};
                            v.forEach(function(va, k, m) {
                                r[k] = va;
                            });
                        }
                    }
                    return r;
                });
            },
            _validate : function() {
                var _this = this;
                var v = function(n, kty) {
                    if(!this._data[n]) {
                        this._data[n] = fkt.im();
                    }
                    if(window.Map && this._data[n].constructor !== Map) {
                        var entries = Object.entries(this._data[n]);
                        if(kty == 0) {
                            entries.forEach(function(it){
                               it[0] = parseInt(it[0]); 
                            });
                        }
                        this._data[n] = new Map(entries);
                    }
                };
                tidx.forEach(function(it, i) {
                    v.call(_this, it, kty[i]);
                });
            },
            _after : function(n) {
                fkt.rm(this._data[n], this._max);
                this._change(n);
                this._fire();
            },
            _fire : function() {
                if(this._pending) {
                    return;
                }
                this._pending = true;
                domy.defer(function() {
                    this._pending = false;
                    localStorage.setItem('changeData', this._stringify());
                    $.event.trigger({
                    	type: "wlcmChange"
                    }, [this._data, this._changes, fkt]);  
                }, this);
            },
            run_start : function(rid, name) {
                fkt.set(this._data.run, rid, {t:this._time(), n:name});
                this._after('run');
            },
            run_edit : function(rid, name, ty) {
                if(ty == 1) {
                    fkt.unset(this._data.run, rid);
                } else
                if(ty == 2) {
                    var d = fkt.get(this._data.run, rid);
                    if(d) {
                        fkt.set(this._data.run, rid, {t:d.t, n:name, ty:ty});
                    }
                }
                this._after('run');
            },
            dasm_open : function(d, pname) {
                fkt.set(this._data.dasm, d, {t:this._time(), n:pname});
                this._after('dasm');
            },
            src_open : function(s) {
                fkt.set(this._data.src, s, {t:this._time()});
                this._after('src');
            },
            probe_edit : function(pid, name, ty) {
                if(ty == 1) {
                    fkt.unset(this._data.probe, pid);
                } else {
                    fkt.set(this._data.probe, pid, {t:this._time(), n:name, ty:ty});
                }
                this._after('probe');
            },
            module_edit : function(mid, name, ty) {
                if(ty == 1) {
                    fkt.unset(this._data.module, mid);
                } else {
                    fkt.set(this._data.module, mid, {t:this._time(), n:name, ty:ty});
                }
                this._after('module');
            },
            chat_inv : function(u, ty) {
                fkt.set(this._data.chat, u, {t:this._time(), ty:ty});
                this._after('chat');
            },
            user_edit : function(uid, name, ty) {
                if(ty == 1) {
                    fkt.unset(this._data.user, uid);
                } else {
                    fkt.set(this._data.user, uid, {t:this._time(), n:name, ty:ty});
                }
                this._after('user');
            },
            save : function(after) {
                var d = JSON.stringify(this._data);
                // TODO post
            },
            clear : function() {
                localStorage.removeItem('changeData');
                tidx.forEach(function(it) {
                    this._data[it] = fkt.im();
                }, this);
            },
            update : function(d, after) {
                if(d) {
                    this._data = d;
                    localStorage.setItem('changeData', this._stringify());
                } else {
                    var t = localStorage.getItem('changeData');
                    if(t) {
                        this._data = JSON.parse(t);
                    }
                }
                tidx.forEach(function(it) {
                    _welcome_change._changes[it] = {};
                });
                this._validate();
                this._fire();
            },
            data : function() {
                return this._stringify();
            }
        };
        
        tidx.forEach(function(it) {
            _welcome_change._data[it] = fkt.im();
            _welcome_change._changes[it] = {};
        });
        
        w.change = _welcome_change;
        
        var upd = function() {
            if(!window.domy) {
                setTimeout(function() {
                    upd();
                }, 50);
                return;
            }
            change.update(login_current().s, function() {
                delete login_current().s;
            });
        };
        upd();
    })();
    
    (function ($) {
        var originalVal = $.fn.val;
        $.fn.lbl_data_val = function (v) {
            var e = $(this);
            var p = e.closest('.fl-wrap');
            var l = p.find('.fl-label');
            if(v !== '') {
                l.css('transition', 'none');
                p.addClass('fl-is-active');
                domy.defer(function() {
                    l.css('transition', '');
                });
            } else {
                l.css('display', 'none');
                p.removeClass('fl-is-active');
                domy.defer(function() {
                    l.css('display', '');
                });
            }
            if(v == '0') {
                e.val(polyglot.t('main.never'));
            } else {
                var t = new Date(parseInt(v) * 1000);
                e.val(date_format(t, true));
            }
        }
        
        $.fn.lbl_val = function (v) {
            var e = $(this);
            switch(e.attr('type')) {
                case 'checkbox':
                    e.prop('checked', v ? true : false);
                default:
                    var p = e.closest('.fl-wrap');
                    var l = p.find('.fl-label');
                    if(v !== '') {
                        l.css('transition', 'none');
                        p.addClass('fl-is-active');
                        domy.defer(function() {
                            l.css('transition', '');
                        });
                    } else {
                        l.css('display', 'none');
                        p.removeClass('fl-is-active');
                        domy.defer(function() {
                            l.css('display', '');
                        });
                    }
                    e.val(v);
                    break;
            }
        };
    })(jQuery);
    
    ws_connect();
    
    Handlebars.registerHelper('t',
        function(str){
          return _mctx.pg.t(str);
        }
    );
    
    function clear_socket() {
        if(_socket != 0) {
            ticket_clear(_socket);
        }
        _socket = 0;
    }
    
    this.onResize = function(e) {
        $.each(_riid_map, function(k, v) {
            if(v._onViewChange) {
                v._onViewChange(0);
            }
        });
        if(_riid_map != _active_riid_map) {
            $.each(_active_riid_map, function(k, v) {
                if(v._onViewChange) {
                    v._onViewChange(0);
                }
            });
        }
    };
    
    w.module_viewed = function() {
        $.each(_riid_map, function(k, v) {
            if(v._onViewChange) {
                v._onViewChange(1);
            }
        });
        if(_riid_map != _active_riid_map) {
            $.each(_active_riid_map, function(k, v) {
                if(v._onViewChange) {
                    v._onViewChange(1);
                }
            });
        }
    }
    
    w.module_resized = function(rid) {
        var m = _riid_map[rid];
        if(m && m._onViewChange) {
            m._onViewChange(0);
        }
        if(_riid_map != _active_riid_map) {
            m = _active_riid_map[rid];
            if(m && m._onViewChange) {
                m._onViewChange(0);
            }
        }
    }
    
    $(window).on('resize', this.onResize);
    
    this.chatReady = function() {
        _chatMsgs.forEach(function(n) {
            $.event.trigger({
            	type: "onChat"
            }, [n]);
        });
        _chatMsgs = null
    };
    
    $(document).one('chatReady', this.chatReady);
    
    this.wsock_open = function() {
        clear_socket();
        _socket_pending = [];
    };
    
    $(document).on('wsock_open', this.wsock_open);
    
    this.wsock_close = function() {
        clear_socket();
        ticket_clear_all();
        _probes = window.Map ? new Map() : {};
        probe_change(); 
    }
    
    $(document).on('wsock_close', this.wsock_close);
    
    ctx.logout = function() {
        login_logout(false, change.data());
        change.clear();
        var loader = loader_init($('#main'), function() {
            return '<div class="ui text loader"></div>';
        });
        loader.show();
    }
    
    w.date_format = function(d, secs) {
        var h = d.getHours();
        var m = d.getMinutes();
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var ss = d.getSeconds();
        h = h <= 9 ? '0' + h : h;
        m = m <= 9 ? '0' + m : m;
        mm = mm <= 9 ? '0' + mm : mm;
        dd = dd <= 9 ? '0' + dd : dd;
        ss = ss <= 9 ? '0' + ss : ss;
        var s = h + ':' + m + (secs ? (':' + ss) : '');
        return dd + "/" + mm + "/" + d.getFullYear() + " - " + s;
    }
    
    w.gperm_get_all = function() {
        return $.extend({}, _eperms);
    }
    
    w.isAdmin = function() {
        var c = login_current();
        return c.admin;
    };
    
    w.hasPerm = function(v, n, uid) {
        var c = login_current();
        if(c.admin || uid === c.id) {
            return true;
        }
        if(_eperms[v] !== undefined) {
            return (n & _eperms[v]) != 0;
        }
        return false;
    };

    $(".openbtn").on("click", function() {
    $("#main > .ui.sidebar").toggleClass("very thin icon smallmenu");
    $(".mbar").toggleClass("smallbar");
    $(".main_content").toggleClass("noleft");
    $(".ui.accordion").toggleClass("displaynone");
    
    $(".logo").find('img').toggle();
     
    });
    
    $('.ui.accordion').accordion({
                                    selector: {
                                    
                                    }
                                    });
    
    var _theModal = null;
    var _messages = [];
    var _msg_timeout = -1;
    var _probes = window.Map ? new Map() : {};
    
    $('#mainName').text(login_get_name());
    
    this.nameChange = function(e, name) {
        $('#mainName').text(name);
    };
    
    $(document).on('nameChange', this.nameChange);
    
    w.onVisibleModal = function() {
        _theModal = $(".ui.modal:visible")[0];
        focus_jail(_theModal);
    }
    
    w.onHiddenModal = function() {
        _theModal = null;
        focus_jail(null);
    }
    
    w.onShowModal = function() {
        $('#main').css('overflow', 'hidden');
    }
    
    w.onHideModal = function() {
        setTimeout(function() {
            $('#main').css('overflow', 'auto');
        }, 1500);
    }
    
    var _cache_init = function(data) {
        data.get = function(k, f, c) {
            return cache_get(_files, k, f, c);
        };
        
        data.update = function(k, v) {
            return cache_get(_files, k, function(f) {
                 f(v, false);
            }, true);
        };
        
        data.remove = function(k) {
            delete _files[k];
        };
        
        data.genKey = function(m, ty) {
            return '/' + m + '/' + ty + '/';
        };
    
        return data;
    };
    
    var _files = {};
    var _fc = _cache_init({});
    
    w.file_cache = function(data) { 
        data.get = _fc.get;
        data.update = _fc.update;
        data.remove = _fc.remove;
        data.genKey = _fc.genKey;
    
        return data;
    };
    
    w.addML = function(lang, d) {
        if(lang == _mctx.pg.locale()) {
            _mctx.pg.extend(d());
        }
    }
    
    w.getMCtx = function(el) {
        while(true) {
            el = el.parentNode;
            if(!el) 
                return null;
            if(el.hasAttribute('module')) {
                return el._ctx;
            }
        }
    } 
    
    w.addM = function(ty, d) {
        switch(ty) {
        case 0:
            var head = document.getElementsByTagName("head")[0];
            var el = document.createElement('style');
            el.textContent = _mprefix + d.join(_mprefix);
            head.insertBefore(el, head.firstChild);
            if(_mctx._s == undefined) {
                _mctx._s = [];
            }
            _mctx._s.push(el);
            break;
        case 1:
            if(_mctx._f == undefined) {
                _mctx._f = [];
            }
            _mctx._f.push(d);
            break;
        case 2:
            _mctx._ct.html(Handlebars.template(d));
            break;
        }
    }
    
    var _ef = function(ty, msg) {
        
    }
    w.lib_set_error = function(f) {
        _ef = f;
    }
    var _lib = {
        add_error:function(rid, v) {
            _ef('rid: ' + rid, v);
        },
        add_setup_error:function(mid, v) {
            _ef('mid: ' + mid, v);
        },
        fetch:function(o, p, set) {
            p = p.split('/');
            try {
                p.forEach(function(it) {
                    var idx;
                    if(it.endsWith(']')) { 
                        var b = it.indexOf('[');
                        var e = it.indexOf(']');
                        idx = parseInt(it.substring(b + 1, e));
                        it = it.substring(0, b);
                    }
                    if(o[it] !== undefined) {
                        if(idx !== undefined) {
                            o = o[it][idx];
                        } else {
                            o = o[it];
                        }
                    } else {
                        throw it;
                    }
                });
            } catch(e) {
                return;
            }
            set(o);
        },
        load_mod:function(mid, p) {
            if(p !== undefined) {
                // TODO   
            }
            return $.Deferred(function(d) {
                post('/sys/server/', {data:JSON.stringify({cmd:-1}), ext_data:JSON.stringify({a:id, b:ty})}, function(v, err, status) {
                    d.resolve(v, err || v.r != 0, status);
                }, {responseType:'json'});
            }).promise();
        },
        load_minst:function(id, ty, p) {
            if(p !== undefined) {
                // TODO   
            }
            return $.Deferred(function(d) {
                post('/sys/server/', {data:JSON.stringify({cmd:75}), ext_data:JSON.stringify({a:id, b:ty})}, function(v, err, status) {
                    d.resolve(v, err || v.r != 0, status);
                }, {responseType:'json'});
            }).promise();
        },
        load_rinst:function(rid, p) {
            if(p !== undefined) {
                // TODO   
            }
            return $.Deferred(function(d) {
                post('/sys/server/', {data:JSON.stringify({cmd:93}), ext_data:JSON.stringify({id:rid})}, function(v, err, status) {
                    d.resolve(v, err || v.r != 0, status);
                }, {responseType:'json'});
            }).promise();
        },
        save_mod:function(mid, v, p) {
            if(p !== undefined) {
                // TODO   
            }
            return $.Deferred(function(d) {
                post('/sys/server/', {data:JSON.stringify({cmd:-1}), ext_data:JSON.stringify({a:id, b:ty})}, function(v, err, status) {
                    d.resolve(v, err || v.r != 0, status);
                }, {responseType:'json'});
            }).promise();
        },
        save_minst:function(iid, v, p) {
            return $.Deferred(function(d) {
                if(p !== undefined) {
                    // TODO   
                }
                post('/sys/server/', {data:JSON.stringify({cmd:65}), ext_data:JSON.stringify({n:iid, e:v})}, function(v, err, status) {
                    d.resolve(err || v.r != 0, status);
                }, {responseType:'json'});
            }).promise();
        },
        save_rinst:function(rid, v, p) {
            return $.Deferred(function(d) {
                if(p !== undefined) {
                    // TODO   
                }
                post('/sys/server/', {data:JSON.stringify({cmd:91}), ext_data:JSON.stringify({m:rid, b:v})}, function(v, err, status) {
                    d.resolve(err || v.r != 0, status);
                }, {responseType:'json'});
            }).promise();
        },
        save_gen_code:function(mid, iid, v, ty) {
            ty = ty || 0;
            return $.Deferred(function(d) {
                var fd = new FormData();
                var blob = new Blob([v], { type: 'application/octet-stream'});
                var data = {cmd:4, id:mid, x:ty, y:iid};
                fd.append('data', JSON.stringify(data));
                fd.append('parent', '');
                fd.append('name', 'file');
                fd.append('file', blob);
                
                post('/sys/upload/', fd, function(v, err, status) {
                    d.resolve(err || v.r != 0, status);
                }, {responseType:'json'});
            }).promise();
        }
    };
    
    var _riid_map = {};
    var _active_riid_map = {};
    
    w.module_cache_unshare = function() {
        if(_active_riid_map == _riid_map) {
            _active_riid_map = $.extend({}, _riid_map);
        }
    }
    
    w.module_cache_share = function() {
        _active_riid_map = _riid_map;
    }
    
    w.module_cache_unset = function() {
        _active_riid_map = {};
    }
    
    w.module_cache = function(ctx) {
        var c = w.file_cache(ctx);
        ctx._m = {};
        c.load = function(key, v, ct, opt) {
            var mctx = {_ct:ct};
            var pg = mctx.pg = new Polyglot();
            var lib = {pg:pg};
            var copyOld;
            var deferLoad;
            if(opt.ty == 0) {
                lib.save_gen_code = function(v, ty) {
                    return _lib.save_gen_code(opt.mid, opt.iid, v, ty);
                };
                lib.load_mod = function(p) {
                    return _lib.load_mod(opt.mid, p);
                };
                lib.save_mod = function(v, p) {
                    return _lib.save_mod(opt.mid, v, p);
                };
            }
            if(opt.ty == 0 || opt.ty == 1) {
                lib.save_minst = function(v, p) {
                    return _lib.save_minst(opt.iid, v, p);
                };
                lib.add_error = function(v) {
                    return _lib.add_setup_error(opt.mid, v);
                };
            }
            if(opt.ty == 1 || opt.ty == 2) {
                lib.save_rinst = function(v, p) {
                    return _lib.save_rinst(opt.rid, v, p);
                };
                lib.load_rinst = function(p) {
                    return _lib.load_rinst(opt.rid, p);
                };
                lib.add_error = function(v) {
                    return _lib.add_error(opt.rid, v);
                };
            }
            if(opt.ty == 0 || opt.ty == 1 || opt.ty == 2) {
                lib.load_minst = function(p) {
                    var id = opt.iid;
                    var ty = 0;
                    if(id === undefined) {
                        id = opt.rid;
                        ty = 1;
                    }
                    return _lib.load_minst(id, ty, p);
                };
            }
            lib.fetch = _lib.fetch;
            if(opt.ty != 0 && opt.rid !== undefined) {
                var old = _active_riid_map[opt.rid];
                if(old) {
                    copyOld = old._copyData;
                }
                _riid_map[opt.rid] = mctx;
                mctx.rid = opt.rid;
            }
            _mprefix = opt.prefix;
            _mctx = ctx._m[key] = mctx;
            var head = document.getElementsByTagName("head")[0];
            var el = document.createElement('script');
            el.textContent = v;
            pg.locale(polyglot.locale());
            head.insertBefore(el, head.firstChild);
            head.removeChild(el);
            if(mctx._f) {
                mctx._fctx = {prefix:opt.prefix};
                mctx._f.forEach(function(i) {
                    i(mctx._fctx, lib);
                });
                if(opt.ty != 0) {
                    if(mctx._fctx.onData) {
                        if(mctx._fctx.onLoad) {
                            deferLoad = mctx._fctx.onLoad;
                        }
                    
                        mctx._onData = mctx._fctx.onData;
                    }
                    if(mctx._fctx.onViewChange) {
                        mctx._onViewChange = mctx._fctx.onViewChange;
                    }
                    if(mctx._fctx.copyData) {
                        mctx._copyData = mctx._fctx.copyData;
                    }
                }
            }
            ct.attr('module', '');
            ct[0]._ctx = mctx._fctx || {prefix:opt.prefix};
            _mctx = null;
            
            if(deferLoad) {
                deferLoad = deferLoad();
            }
            
            if(copyOld && mctx._onViewChange) {
                var after = function() {
                    copyOld(mctx._onViewChange);
                };
                if(deferLoad) {
                    deferLoad.then(after);
                } else {
                    after();
                }
            }
            return deferLoad || $.Deferred(function(d) { d.resolve(); });
        }
        
        c.unload = function(key) {
            var mctx = ctx._m[key];
            if(mctx._s) {
                mctx._s.forEach(function(i) {
                    i.parentNode.removeChild(i);
                });
            }
            
            if(mctx.rid !== undefined) {
                delete _riid_map[mctx.rid];
            }
            mctx._ct[0]._ctx = null;
            mctx._ct.html('');
            delete ctx._m[key];
            return mctx;
        }
        return c;
    }
    
    w.cache_get = function(o, n, f, c) {
        if(c) {
            delete o[n];
        }
        if(!o[n]) {
            var def = $.Deferred(function(d) {
                f(function(v, err, status) {
                    if(err && o[n] == def) {
                        delete o[n];
                    }
                    d.resolve(v, err, status);
                });
            }).promise();
            o[n] = def;
        }
        return o[n];
    };
    
    w.defer_init = function(num) {
        var d = {i:0,n:num,d:$.Deferred()};
        d.then = function(resolve, reject) {
            return d.d.then(resolve, reject);
        }
        d.once = function(resolve, reject) {
            return d.d.then(function(v) {
                if(!d.f) {
                    d.f = true;
                    resolve(v);
                }
            }, function(v) {
                if(!d.f) {
                    d.f = true;
                    reject(v);
                }
            });
        }
        d.ready = function(err) {
            if(++d.i >= d.n) {
                d.d.resolve(err);
            } 
        }
        d.abort = function(e) {
            d.d.reject(e);
        }
        d.update = function(n){
            d.n = n;
        }
        d.reset = function() {
            d.i = 0;
            delete d.f;
            d.d = $.Deferred();
        }
        return d;
    }
    
    w.probes_each = w.Map ? function(f) {
        _probes.forEach(function(v, k) {
           f(k, v);
        });
    } : function(f) {
        $.each(_probes, f);
    }
    
    w.probes_count = w.Map ? function() {
        return _probes.size;
    } : function() {
        return Object.getOwnPropertyNames(_probes).length;
    }
     
    w.probes_get_all = function() {
        return _probes;
    }
    
    var pget = w.probes_get = w.Map ? function(s) {
        return _probes.get(s);
    } : function(s) {
        return _probes[s];
    }
    
    var pset = w.Map ? function(k, v) {
        _probes.set(k, v);
        return v;
    } : function(k, v) {
        return _probes[k] = v;
    }
    
    var prem = w.Map ? function(s) {
        _probes.delete(s);
    } : function(s) {
        delete _probes[s];
    }
    
    function ticket_clear(s) {
        var ts = _tickets_per_socket[s];
        if(ts) {
            ts.forEach(function(t) {
                _tickets[t].onError({});
            });
        }
    }
    
    function ticket_clear_all() {
        probes_each(function(k, v) {
            ticket_clear(k);
        });
        _tickets_per_socket = {};
        _tickets = {};
    }
    
    function probe_add(d) {
        var p = {id:d.id, t:d.time, kv:d.kv, v:d.v, m:d.m};
        if(d.i !== '') {
            p.n = d.i;
        }
        return pset(d.s, p);
    }
    
    function probe_rem(d) {
        var p = pget(d.s);
        prem(d.s);
        ticket_clear(d.s);
        return p;
    }
    
    w.client_socket = function(after) {
        if(_socket_pending != null) {
            _socket_pending.push(after);
        } else {
            after(_socket);
        }
    }
    
    w.message_clear = function() {
        clearTimeout(_msg_timeout);
        _msg_timeout = -1;
        _messages = [];
    }
    
    function message_handle() {
        var p_add = [];
        var p_rem = [];
        var probeChange = false;
        var time = Math.ceil(new Date().getTime() / 1000);
        _messages.forEach(function(n, i) {
            switch(n.t) {
                case 0: // probe disconnect
                    p_rem.push(probe_rem(n));
                    break;
                case 1: // probe connect
                    n.time = time;
                    p_add.push(probe_add(n));
                    break;
                case 3: // probe forward
                    var o = _tickets[n.n];
                    var rf;
                    if(o !== undefined && pget(o.p.s).t <= n.w) {
                        if(n.r !== undefined) {
                            ticket_remove(n.n);
                        }
                        if(n.r === undefined || n.r === 0) {
                            rf = o.onResult;
                        } else {
                            rf = o.onError;
                        }
                        if(!o.killed) {
                            rf.call(o, n);
                        }
                    } 
                    break;
                case 4: // client connect
                    clear_socket();
                    _socket = n.s;
                    if(_socket_pending != null) {
                        _socket_pending.forEach(function(n, i) {
                            n(_socket);
                        });
                        _socket_pending = null;
                    }
                    break;
                case 5: // client result
                    var o = _tickets[n.n];
                    var rf;
                    if(o !== undefined) {
                        if(n.r !== undefined && n.r == 0) {
                            ticket_remove(n.n);
                            rf = o.onResult;
                        } else {
                            rf = o.onError;
                        }
                        if(!o.killed) {
                            rf.call(o, n);
                        }
                    }
                    break;
                case 6: // chat messages
                    if(_chatMsgs != null) {
                        _chatMsgs.push(n);
                    } else {
                        $.event.trigger({
                        	type: "onChat"
                        }, [n]);
                    }
                    break;
                case 7: // pending ready
                    $.event.trigger({
                    	type: "onPendingReady"
                    }, [n]);
                    break;
                case 8: // probe run change
                    $.event.trigger({
                    	type: "onRunChange"
                    }, [n]);
                    break;
                case 9: // run data
                    var mctx = _active_riid_map[n.i];
                    if(mctx && mctx._onData) {
                        var p = w.probes_get(n.p);
                        if(p) {
                            mctx._onData(n, p, _riid_map == _active_riid_map ? 0 : 1);
                        }
                    }
                    break;
            }
        });
        _messages = [];
        
        if(p_rem.length) {
            var m = p_rem.length == 1 ? polyglot.t('probe.disc_name', {name: probe_label(p_rem[0])}) : polyglot.t('probe.disc_multi', {smart_count:p_rem.length});
            $('body').toast({
                title:polyglot.t('probe.disc'),
                class:'info',
                message:m
            });
            probeChange = true;
        }
        
        if(p_add.length) {
            var m = p_add.length == 1 ? polyglot.t('probe.con_name', {name: probe_label(p_add[0])}) : polyglot.t('probe.con_multi', {smart_count:p_add.length});
            $('body').toast({
                title:polyglot.t('probe.con'),
                class:'info',
                message:m
            });
            probeChange = true;
        }
        
        if(probeChange) {
            probe_change();
        }
    }
    
    w.probe_has_label = function(o) {
        return !(o.n === undefined || o.n === '');
    }
    
    w.probe_label = function(o) {
        if(o.n === undefined || o.n === '') {
            return '#' + polyglot.t('probe.noname') + '@id=[' + o.id + ']';
        } 
        return o.n;
    }
    
    function probe_change() {
        $.event.trigger({
        	type: "probeChange"
        }, [_probes]);
    }
    
    w.onMessage = function(e) {
        var d = null;
            try {
                if(e.data.constructor === String) {
                    d = JSON.parse(e.data);
                } else {
                    d = CBOR.decode(e.data);
                }
                _messages.push(d);
            } catch(e) {
                d = {};
            }
        
        if(_messages.length >= 1024) {
            message_handle();
        }
        clearTimeout(_msg_timeout);
        setTimeout(message_handle, 200);
    };
    
    var _sbw = 0;
    var _sbh = 0;
    
    function sbInit() {
        var d = document.createElement("div");
        d.className = "sb-test";
        document.body.appendChild(d);
        
        _sbw = d.offsetWidth - d.clientWidth;
        _sbh = d.offsetHeight - d.clientHeight;
        
        document.body.removeChild(d);
        
    }
    
    var _tickets = {};
    var _tickets_per_socket = {};
    
    function ticket_remove(t) {
        var n = _tickets[t];
        delete _tickets[t];
        if(t.constructor === String)
            t = parseInt(t);
        var a = _tickets_per_socket[n.p.s];
        var i = a.indexOf(t);
        a.splice(i, 1);
    }
    
    function ticket_new(o, s) { 
        if(o.p) {
            s = o.p.s;
        } else {
            o.p = {s:s};
        }
        if(s !== undefined) {
            do {
                var t = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1));
                if(_tickets[t] === undefined) {
                    o.t = t;
                    _tickets[t] = o;
                    if(!_tickets_per_socket[s]) {
                        _tickets_per_socket[s] = [];
                    }
                    _tickets_per_socket[s].push(t);
                    return t;
                }
            } while(true);
        }
        return null;
    }
    
    w.get_visible_split = function(e) {
        return e[0].onLoadOnce;
    };
    
    w.clear_visible_split = function(e) {
        e[0].onLoadOnce = null;
    };
    
    w.do_visible_split = function(e, f) {
        if(in_dom(e.children().first()[0])) {
            f();
            return true;
        } else {
            e[0].onLoadOnce = f;
            return false;
        }
    };
    
    function subAddLoad(sub, f) {
        if(sub.onLoadOnce) {
            var of = sub.onLoadOnce;
            sub.onLoadOnce = function() {
                of();
                f();
            }
        } else {
            sub.onLoadOnce = f
        }
    }
            
    w.do_visible_path = function(sub, f) {
        if(sub) {
            if(sub.__visible) {
                f();
            } else {
                subAddLoad(sub, f);
            }
        } else {
            f();
        }
    }
    
    w.doSplit = function(panes, sizes, ctx, fixed, fill) {
        domy.defer(function() {
            var num = 0;
            var p = [];
            var s = [];
            var o = 0;
            var opt = {};
            
            if(!Array.isArray(sizes)) {
                opt = sizes;
                sizes = opt.sizes;
            }
            
            if(!Array.isArray(fixed)) 
                fixed = fixed !== undefined ? [fixed] : [];
            
            if(ctx.split) {
                ctx.split.destroy();
            }
            $.each(panes, function(i, n) {
                if($(n).css('display') != 'none') {
                    p.push(n);
                    s.push(sizes[i]);
                } else {
                    o += sizes[i];
                    
                    var k = fixed.indexOf(n);
                    if(k != -1) {
                        fixed.splice(k, 1);
                    }
                }
            });
            
            if(p.length == 0) {
                return;
            }
            
            if(p.length == fixed.length) {
                fixed = [];
            }
            
            if(p.length != sizes.length && fill) {
                $.each(fill, function(i, n) {
                    var idx;
                    if(n && (idx = p.indexOf(panes[i])) != -1) {
                        o -= n;
                        s[idx] += n;
                    }
                });
            }
            
            var pl = p.length;
            pl -= fixed.length;
            
            for(var i = 0; i < p.length; i++) {
                if(fixed.indexOf(p[i]) == -1) {
                    s[i] += o / pl;
                }
            }
            
            o = {
                gutter: function (index, direction) {
                    var gutter = document.createElement('div')
                    gutter.className = 'gutter gutter-' + direction;
                    return gutter
                },
                gutterSize: 4,
                sizes: s,
            }
            
            if(opt.minSize) {
                o.minSize = opt.minSize;
            }
            
            if(ctx.dir) {
                o.direction = ctx.dir;
            }
            
            ctx.split = Split(p, o);
            
        });
    }
    
    w.request_kill = function(t) {
        var n = _tickets[t];
        if(t.constructor === String)
            t = parseInt(t);
        if(n && !n._killed) {
            var pr = probes_get(n.p.s)
            var d = {t:3, data:"", p:n.p, r:t, x:pr.t};
            n.killed = true;
            return n._killed = wss(JSON.stringify(d));
        }
        return false;
    };
    
    w.toast = function(t, m, c) {
        $('body').toast({
            title:t,
            class:c,
            message:m
        });
    };
    
    function toHex(i, l){
        var r = i.toString(16);
        return "0".repeat(l - r.length) + r;
    }
    
    function _request(t, d, o, a) {
        d.r = t;
        var msg = JSON.stringify(d);
        if(a !== undefined) {
            if(d.data !== undefined) {
                return false;
            }
            var len = msg.length + 14; // ',"data"="XXXX"'
            msg = msg.slice(0, -1);
            msg += ',"data":"' + toHex(len, 4) + '"}';
            msg += a.constructor === String ? a : JSON.stringify(a);
        }
        if(wss(msg)) {
            return true;
        }
        ticket_remove(t);
        o.onError({});
        return false;
    };
    
    w.request = function(d, o, a) {
        var t = ticket_new(o);
        if(!t)
            return false;
        return _request(t, d, o, a);
    };
    
    w.request_client = function(d, o, a) {
        client_socket(function(s) {
            var t = ticket_new(o, s);
            if(!t) {
                o.onError({});
            } else {
                return _request(t, d, o, a);
            }
        });
        return true;
    }
    
    w.sbw = function() {
        return _sbw;
    };
    
    w.sbh = function() {
        return _sbh;
    };
    
    function val(v) {
        if(!v.attr) return v;
        switch(v.attr('type')) {
            case 'checkbox':
                return v.prop('checked') ? 1 : 0;
            default:
                break;
        }
        return v.val();
    }
    
    function convert(iv, otv, noint) {
        if(otv.constructor === iv.constructor) {
            return iv;
        }
        switch(otv.constructor) {
            case String:
               return iv;
            case Boolean:
               return iv ? 1 : 0;
            case Number:
                if(noint) {
                    return Number.parseFloat(iv);
                }
                return parseInt(iv);
            default:
                return JSON.stringify(iv);
        }
    }
    
    w.post_get_val = function(o, s, t, i) {
        var r = {};
        var hit = false;
        if(s.length != t.length || t.length != i.length)
        {
            return null;
        }
        for(var k = 0, len = s.length; k < len; k++) {
            var ov = o[s[k]];
            var nv = convert(val(i[k]), ov);
            if(ov !== nv) {
                r[t[k]] = nv;
                hit = true;
            }
        }
        return hit ? {r:r,c:function() {
            for(var k = 0, len = s.length; k < len; k++) {
                var ov = o[s[k]];
                var nv = convert(val(i[k]), ov);
                if(ov !== nv) { 
                    o[s[k]] = nv;
                }
            }
        }} : null;
    };
    
    w.list_select = function(l, a, f, u) {
        var s = null;
        var t = null;
        var sel = function(it) {
            var n = undefined;
            if(t) {
                t.removeClass('active');
                t = null;
            }
            if(s) {
                s.removeClass('active');
            }
            if(it) {
                if(!u || !s || s[0] != it[0]) {
                    s = it;
                    s.addClass('active');
                    n = a(it);
                } else {
                    s = null;
                }
                f(n);
            } else {
                s = null;
            }
            return n;
        }
        l.click(function(e) {
            var it = $(e.target).closest('.item');
            if(it.length != 0 && !it.hasClass('noselect')) {
                sel(it);
            }
        });
        sel.temp = function(n) {
            if(s) {
                s.removeClass('active');
            }
            if(n) {
                n.addClass('active');
                t = n;
            }
            return a(n);
        };
        sel.reset = function(n) {
            if(t) {
                t.removeClass('active');
                t = null;
            }
            if(n && n.hasClass('active')) {
                s = n;
            }
            if(s) {
                s.addClass('active');
            }
        };
        return sel;
    };
    
    w.list_search = function(e, f) {
        var p = e.parent();
        var t = p.find('.toggl');
        var s = p.find('.search.icon');
        t.click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            t.toggleClass('up');
            t.toggleClass('down');
        }); 
        s.click(function(e) { 
            e.preventDefault();
            e.stopPropagation();
            f(e);
        });
        e.on('keydown', function(ev) {
            if(ev.keyCode == 13) {
                f();
            }
        });
        e[0].reset = function() {
            label_reset(e);
        }
        return function(o) {
            if(o) {
                e.parent().addClass('nomouse_i');
                delete o.f1;
                delete o.f2;
                o.o = t.hasClass('up') ? 1 : 0;
                v = e.val();
                if(v !== '') {
                    v = v.split('|');
                    if(v.length == 1) {
                       o.f1 = v[0]; 
                    } else {
                       o.f1 = v[0]; 
                       o.f2 = v[1]; 
                    }
                }
                return o;
            } else {
                e.parent().removeClass('nomouse_i');
            }
        };
    };
    
    w.label_reset = function(e) {
        e.val('');
        e.closest('.fl-wrap').removeClass('fl-is-active');
    };
    
    w.label_set_date = function(e, v) {
        e.lbl_data_val(v);
    }
    
    w.label_set = function(e, v) {
        e.lbl_val(v);
    };
    
    w.paging_reset = function(l) {
        l.s = undefined;
        l.e = undefined;
        l.max = undefined;
    };
    
    w.in_dom = function(e) {
        var r = e.getBoundingClientRect();
        return (r.top || r.bottom || r.height || r.width) ? true : false;
    };
    
    w.search_filter = function(m, k) {
        var f = $(m);
        
        f[0].onclick = function(e) { e.stopPropagation(); }; 
        
        var ld = $(k + ' .ui.search.dropdown');
        ld.on('click', function() {
            var p = f.parents('.filter').parent();
            p.toggleClass('hide');
            var l = $(k + ' .page_outer');
            var c = l.children();
            p.insertAfter(p.hasClass('hide') ? c.last() : c.first());
            $(k + ' .content').toggleClass('shortFilter');
            f.focus();
        });
        f.ld = ld;
        return f;
    };
    
    w.lock_post_init = function(sub) {
        var o = {};
        o.post = function(url, d, after, rty) {
            sub.lockList();
            return post(url, d, function(r, e, s) {
                after(r, e, s);
                sub.unlockList();
            }, rty)
        }
        
        o.raw_post = function(url, d, after, rty) {
            sub.lockList();
            return raw_post(url, d, function(r, e, s) {
                after(r, e, s);
                sub.unlockList();
            }, rty)
        }
        return o;
    };
    
    w.sel_ready_init = function() {
        var o = {};
        o._psel = [];
        o._selr = false;
        o.on_ready = function(f) {
            if(o._selr) {
                f();
            } else {
                o._psel.push(f);
            }
        };
        
        o.set_ready = function(v) {
            o._selr = v;
            if(v) {
                o._psel.forEach(function(f) {
                    f();
                });
                o._psel = [];
            }
        };
        
        return o;
    };

    w.visibility_init = function(sub, d, p){
        d.dropdown({
           transition: 'fade up',
           context: 'body',
           action:'nothing'
        });
        
        var onView = function() {
            subAddLoad(sub, function() {
                d.find('.checkbox').each(function(i, v) {
                    if($(v).hasClass('checked')) {
                        var n = $(p(i));
                        var el = n[0];
                        if(el.onLoadOnce) {
                            var l = el.onLoadOnce;
                            el.onLoadOnce = null;
                            l();
                        }
                    }
                });
                onView();
            });
        };
    
        onView();
    
        d.find('.checkbox').each(function(i, v) {
            var e = $(v);
            if(e.find('input')[0].hasAttribute("checked")) {
                e.addClass('checked');
            }
            e.checkbox({
                onChecked: function() {
                    var n = $(p(i));
                    var el = n[0];
                    el.style.opacity = 0;
                    n.css('display', 'block');
                    domy.defer(function() {
                        sub.split();
                        _fadeIn(el, 200);
                        if(el.onLoadOnce) { 
                            var l = el.onLoadOnce;
                            el.onLoadOnce = null;
                            l();
                        }
                    });
                },
                onUnchecked: function() {
                    fadeOut($(p(i))[0], 200, function() {
                        domy.defer(function() {
                            sub.split();
                        });
                    });
                }
            });
        });
    };
    
    w.loader_init = function(c, f) {
        var  r = $('<div class="ui active inverted dimmer hide">' + (!f ? '<div class="ui loader"></div>' : f()) + '</div>').appendTo(c);
        var rem = r.remove;      
        var p = r.closest('.grid_c');
        
        r.show = function() {
            c.addClass('noscroll');
            r.removeClass('hide');
            r.attr('style','top:' + p.scrollTop() + 'px !important;');
        }
        
        r.hide = function() {
            c.removeClass('noscroll');
            r.addClass('hide');
            r.attr('style','');
        }
        
        r.remove = function() {
            c.removeClass('noscroll');
            rem.call(this);
        }
        return r;
    };
    
    w.error_set_text = function(e, hdr, msg, noclose) {
        var h = e.find('.header');
        var p = e.find('p');
        var c = e.find('.close');
        h.text(hdr);
        p.text(msg);
        if(noclose) {
            c.addClass("hide");
        } else {
            c.removeClass("hide");
        }
    };
    
    w.hide_init = function(r) {
        r.show = function() {
            r.removeClass('hide');
        }
        
        r.hide = function() {
            r.addClass('hide');
        }
    }
    
    w.error_init = function(c, h, m, a) {
        var r = $('<div class="ui active inverted dimmer hide"><div class="ui red message transition"><i class="close icon"></i><div class="header">' + 
                         h + '</div><p>' +
                         m + '</p></div></div>').appendTo(c);
           
        r.click(function(e) {e.stopPropagation();});              
        var p = r.closest('.grid_c');
        
        r.show = function() {
            p.addClass('werror');
            r.removeClass('hide');
            r.attr('style','top:' + p.scrollTop() + 'px !important;');
        }
        
        r.hide = function() {
            p.removeClass('werror');
            r.addClass('hide');
            r.attr('style','');
            if(a) {
                a(r);
            }
        }
        
        r.find('.close').on('click', function() {
            var _this = $(this);
            
            var msg = _this
              .closest('.message');
            msg.transition('fade', function() {
                    r.hide();
                  msg.removeClass('hidden');
              });
            ;
        });
        
        return r;
    };
    
    jQuery.fn.replaceFrom = function(v, cls) {
        var o = $(this[0])
        
        if(cls && !o.hasClass(cls)) {
            cls = undefined;
        }
    
        o.hide();
        var it = $(v).insertAfter(o);
        o.remove();
        
        if(cls !== undefined) {
            it.addClass(cls);
        }
    
        return it;
    };
    
    w.paging_render = function(after, c, p, l, po, d) {
        domy.defer(function() {
            domy.off(function() {
                var h = c.height();
                var w = p.width();
                var m = undefined;
                var pg = function(p, v) {
                    return "\"var t = this;(function(){var ctx=getCtx('" + l.page + "'),sub=ctx['" + l.sub + "'],f=function(event,p) {" + l[v ? v : 'pg'] + "};f.call(t, event, " + p + ")})()\"" 
                };
                var ov = function(e) {
                    return (e.scrollWidth >= e.clientWidth) + (e.scrollWidth == e.clientWidth);
                };
                var ovv;
                
                if(po < 0) {
                    po = 0;
                }
                
                if(l.max !== undefined && po > l.max) {
                    po = l.max;
                }
                
                if(l.lw != w) {
                    l.lw = w;
                    l.iv = true;
                }
                
                if(l.lh != h) {
                    if(l.d) {
                        l.d.remove();
                        l.d = null;
                    }
                    var ih = 0;
                    l.lh = h;
                    l.iv = true;
                    var gh = function() {
                        var n = $('<div class="item">&nbsp</div>').appendTo(c);
                        return n.outerHeight(true);
                    };
                    if(!c[0].hasChildNodes()) {
                        ih = gh();
                        c.html('');
                    } else {
                        var f = c.children().first();
                        if(f.hasClass('item')) {
                            ih = f.outerHeight(true);
                        } else {
                            var h = c.html();
                            c.html('');
                            ih = gh();
                            c.html(h);
                        }
                    }
                
                    var oi = l.i;
                    var on = oi * l.max;
                    l.i = Math.floor(c.height() / ih);
                    if(l.i > oi && po * l.i >= on) {
                        po = Math.floor(on / l.i);
                    }
                }
                
                if(d) {
                    p.removeClass('nomouse');
                    l.d = null;
                    c.html('');
                    m = d.m;
                    if(d.r != 0) {
                        l.iv = false;
                        c.append('<div style="padding:10px;">' + polyglot.t('main.lerr') + '</div>')
                        l.s = 0;
                        l.e = 0;
                        p.html('');
                        return;
                    } else
                    if(!d.d || d.d.length == 0) {
                        l.iv = false;
                        c.append('<div style="padding:10px;">' + polyglot.t('main.list_empty') + '</div>')
                        l.s = 0;
                        l.e = 0;
                        p.html('');
                        return;
                    }
                } else {
                    p.addClass('nomouse');
                    if(!l.d) {
                        l.d = $('<div class="ui active inverted dimmer"><div class="ui loader"></div></div>').appendTo(c);
                    }
                }
                
                if(l.po === po && !l.iv) {
                    return;
                }
                
                po = po || 0;
                l.po = po;
                
                if(m === undefined) {
                    var s = l.s || 0;
                    var e = l.e || 0;
                    var i;
                    var k = (po >= s && po <= e && !(s == 0 && po == e));
                    l.iv = true;
                    if(k) {
                        po = s;
                    }
                    
                    var clone = p.clone();
                    clone.css("visibility", "hidden");
                    p.parent().append(clone);
                    clone.html('');
                    $('<a class="item">&lt;&lt;</a>').appendTo(clone);
                    $('<a class="item">&gt;&gt;</a>').appendTo(clone);
                    if(po - e == 1 || k) {
                        // move right
                        l.s = po;
                        i = po;
                        while(true) {
                            $('<div class="item active"><span class="pitem">' + (i + 1) + '</span></div>').appendTo(clone);
                            ovv = ov(clone[0]);
                            if(ovv) {
                                if(ovv == 1)
                                    i--;
                                else 
                                    i++;
                                break
                            }
                            i++;
                        }
                        l.e = i;
                    } else
                    if(s - po == 1) {
                        // move left
                        l.e = po;
                        i = po;
                        while(true) {
                            $('<div class="item active"><span class="pitem">' + (i + 1) + '</span></div>').appendTo(clone);
                            ovv = ov(clone[0]);
                            if(ovv) {
                                if(ovv == 1)
                                    i++;
                                else 
                                    i--;
                                break
                            }
                            i--;
                        }
                        if(i < 0) {
                            l.e += -i;
                            i = 0;
                        }
                        l.s = i;
                    } else {
                        // try to have it in the middle
                        i = po;
                        var k = po + 1;
                        var left = false;
                        $('<div class="item active"><span class="pitem">1</span></div>').appendTo(clone);
                        if(!ov(clone[0])) {
                            while(true) {
                                left = !left && i != 0; 
                                $('<div class="item active"><span class="pitem">' + ((left ? i : k) + 1) + '</span></div>').appendTo(clone);
                                ovv = ov(clone[0]);
                                if(ovv) {
                                    if(ovv == 1) {
                                        k--;
                                    } else {
                                        if(left) { 
                                            i--;
                                        } else {
                                            k++;
                                        }
                                    }
                                    break
                                }
                                if(left) { 
                                    i--;
                                } else {
                                    k++;
                                }
                            }
                        }
                        l.s = i;
                        l.e = k;
                    }
                    clone.remove();
                } else {
                    l.iv = false;
                    var r = $(document.createDocumentFragment());
                    var le = l.e;
                    if(l.po != 0) {
                        $('<a class="item" onclick=' + pg(l.po - 1) + '><span class="pitem">&lt;&lt;</span></a>').appendTo(r);
                    } else {
                        l.e++;
                    }
                     
                    var max = l.po + Math.ceil(m / l.i) - (m != 0);
                    
                    l.max = max;
                    
                    for(i = l.s; i <= l.e && i <= max; i++) {
                        if(i == l.po) {
                            $('<div class="item active"><span class="pitem"><input class="pinput" value="' + (i + 1) + '" onkeydown=' + pg(0, 'kd') + '></span></div>').appendTo(r);
                        } else {
                            $('<a class="item" onclick=' + pg(i) + '><span class="pitem">' + (i + 1) + '</span></a>').appendTo(r);
                        }
                    }
                    
                    var f = r.children().first();
                    if(l.po < max) {
                        $('<a class="item" onclick=' + pg(l.po + 1) + '><span class="pitem">&gt;&gt;</span></a>').appendTo(r);
                    } else {
                        if(l.s > 0) {
                            $('<a class="item" onclick=' + pg(l.s - 1) + '><span class="pitem">' + l.s + '</span></a>').insertAfter(f);
                            l.s--;
                        }
                    }
                    
                    // see if we can add more to the front
                    for(var k = l.s - 1;i <= l.e && k >= 0; i++, k--) {
                        $('<a class="item" onclick=' + pg(k) + '><span class="pitem">' + (k + 1) + '</span></a>').insertAfter(f);
                    }
                    
                    p.html('');
                    p.append(r);
                }
            
            });
            after(l);
        });
    };
    
    w.vlist_init = function(p, c) {
        var o = {
                    nr:c.numRows,
                    nc:c.numCacheRows || 3,
                    rg:c.rowCreator,
                    ly:NaN,
                    ls:NaN,
                    snap:c.snap,
                    sih:c.itemHeight,
                    ccls:c.containerClass ? c.containerClass : 'ccls',
                    scls:c.scrollerClass ? c.scrollerClass : 'scls',
                    hcls:c.holderClass ? c.holderClass : 'hcls',
                    icls:c.itemClass ? c.itemClass : 'icls',
                    ib:c.itemBase || function(i, cls) { return '<div ln="' + i + '" class="' + this.icls + '"></div>'; },
                    br:c.beforeRender || function(b, e) { return null },
                    ar:c.afterRender || function(ctx, b, e, commit) { commit(); }
                 };
    
        domy.off(function() {
            p.html('');
            o.b = c.containerBase || $('<div class="' + o.ccls + '"></div>').appendTo(p);
            o.s = c.scrollBase ||  $('<div class="' + o.scls + '"></div>').appendTo(o.b);
            o.c = c.holderBase || $('<div class="' + o.hcls + '"></div>').appendTo(o.b);
        
        });
    
        function rm() {
            domy.defer(function() {
                if(Date.now() - o.ls > 120) {
                    var rem = o.c.find('.' + o.icls + '.removed');
                    rem.remove();
                     o.ls = NaN;
                }
            });
        }
        
        var ri;
    
        function r(s) {
            var ori = ri = {}; 
            var c = o.c;
            var l = s + o.ci;
            if(l > o.nr) {
                l = o.nr;
                if(s > o.nr) {
                    s = o.nr;
                }
            }
    
            var f = document.createDocumentFragment();
            var ctx;
                
            ctx = o.br(s, l);
            
            domy.off(function() {
                c[0].style.marginTop = (o.dr * s * o.rh) + 'px';
            });
            
            for(var i = s; i < l; i++) {
                var item = $(o.ib(i, o.icls)).appendTo(f);
                item.html(o.rg(ctx, item, s, i));
            }
                
            c.children().addClass('removed');
            
            o.ar(ctx, s, l, function() {
                if(ori == ri) {
                    c[0].appendChild(f);
                }
            });
        }
    
        var rt = function(t, hs) {
            t = (t / o.sh) * o.fh;
            if(isNaN(o.ly) || Math.abs(t - o.ly) > o.mb) {
                var f = parseInt(t / o.rh) - o.il;
                if(isNaN(o.ls)) {
                    o.ls = Date.now();
                }
                o.ly = t;
                r(f < 0 ? 0 : f);
                rm();
                doSnap(hs);
            }
        }
        
        var hasSnap = function() {
            return o.snap && o.b[0].scrollHeight - o.b[0].offsetHeight - o.b[0].scrollTop < 1;
        }
        var doSnap = function(hs) {
            if(hs) {
                domy.defer(function() {
                    domy.off(function() {
                        o.b.scrollTop(o.s[0].offsetHeight);
                    });
                });
            }
        }
    
        var pending = false;
        var s = function(e) {
            e.preventDefault();
            if(pending) {
                return;
            } else {
                pending = true;
            }
            domy.defer(function() {
                var st;
                var hs;
                pending = false;
                domy.off(function() {
                    st = o.b.scrollTop();
                    hs = hasSnap();
                });
                rt(st, hs);
            });
        };
        
        o.b.on('scroll', s);
        
        o.scrollTo = function(idx) {
            var t = (idx * o.rh / o.fh) * o.sh;
            o.b.scrollTop(t); 
        }
        
        o.destroy = function() {
            o.b.off('scroll', s);
            o.b.remove();
        }
        
        var pending_update = null;
        var _hs;
        o.update = function(nr, snap) {
            if(pending_update == null) {
                pending_update = nr;
                _hs = snap || hasSnap();
            } else {
                pending_update = nr;
                return;
            }
                   
            domy.defer(function() {
                var truncp = function(n) {
                    return n < 0 ? 0 : n;   
                }
                var hs;
                nr = pending_update;
                pending_update = null;
                domy.off(function() {
                    hs = _hs;
                    if(nr < o.nr || 
                       nr <= o.ci) {
                        o.ly = NaN;
                    } else
                    if(nr > o.nr) {
                        var a = truncp(parseInt(o.ly / o.rh));
                        if(nr >= a && a + o.ci >= o.nr) {
                        o.ly = NaN;
                        }
                    }
                    o.nr = nr; 
                    var h = (o.rh * o.nr);
                    o.s.css('height', h + 'px');
                    o.sh = o.b[0].scrollHeight;
                    o.fh = (o.rh * o.nr); 
                    o.dr = o.sh / o.fh;
                    st = o.b.scrollTop();
                });
                rt(st, hs);
            });
        }
        
        var pending_resize = false;
        o.onResize = function() {
            if(pending_resize) {
                return;
            } else {
                pending_resize = true;
            }
            domy.defer(function() {
                var st;
                var hs;
                pending_resize = false;
                domy.off(function() {
                    hs = hasSnap();
                    if(o.sih) {
                        o.rh = o.sih;
                    } else {
                        var it = $(o.ib(0, o.icls)).appendTo(o.c);
                        o.rh = it.height();
                        it.remove();
                    }
                    o.cl = o.b.height();
                    o.il = Math.ceil(o.cl / o.rh);
                    o.ci = o.il * o.nc;
                    o.mb = o.il * o.rh;
                    o.s.css('height', (o.rh * o.nr) + 'px');
                    o.sh = o.b[0].scrollHeight;
                    o.fh = (o.rh * (o.nr + 2)); 
                    o.dr = o.sh / o.fh;
                    st = o.b.scrollTop();
                });
                rt(st);
            });
        };
    
        o.onResize();
    
        return o;
    };
    
    sbInit();
    
    $(document).one('cacheDestroy', function() {
        $(window).off('resize', this.onResize);
        $(document).off('chatReady', this.chatReady);
        $(document).off('wsock_open', this.wsock_open);
        $(document).off('wsock_close', this.wsock_close);
        $(document).off('nameChange', this.nameChange);
    });
 });addJ("main","",function(ctx, path, sub) { 
if(!window.domy) {
    var module = {};
    !(function(win) {

/**
 * domy
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 * @author Kornel Lesinski <kornel.lesinski@ft.com>
 */

'use strict';

/**
 * Mini logger
 *
 * @return {Function}
 */
var debug = 0 ? console.log.bind(console, '[domy]') : function() {};

/**
 * Normalized rAF
 *
 * @type {Function}
 */
var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

/**
 * Initialize a `domy`.
 *
 * @constructor
 */
function domy() {
  var self = this;
  self.writes = [];
  self.deferred_reads = [];
  self.raf = raf.bind(win); // test hook
  debug('initialized', self);
}

domy.prototype = {
  constructor: domy,

  /**
   * Adds a job to the read batch and
   * schedules a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  defer: function(fn, ctx) {
    debug('measure');
    var task = { fn: fn, ctx: ctx };
    this.deferred_reads.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  mutate: function(fn, ctx) {
    debug('mutate');
    var task = { fn: fn, ctx: ctx };
    this.writes.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Clears a scheduled 'read' or 'write' task.
   *
   * @param {Object} task
   * @return {Boolean} success
   * @public
   */
  clear: function(task) {
    debug('clear', task);
    return remove(this.deferred_reads, task) || remove(this.writes, task);
  },

  /**
   * Extend this domy with some
   * custom functionality.
   *
   * Because domy must *always* be a
   * singleton, we're actually extending
   * the domy instance. This means tasks
   * scheduled by an extension still enter
   * domy's global task queue.
   *
   * The 'super' instance can be accessed
   * from `this.domy`.
   *
   * @example
   *
   * var mydomy = domy.extend({
   *   // called on creation
   *   initialize: function() {
   *
   *   },
   *
   *   // override a method
   *   measure: function(fn) {
   *     // do extra stuff ...
   *
   *     // then call the original
   *     return this.domy.measure(fn);
   *   },
   *
   *   ...
   * });
   *
   * @param  {Object} props  properties to mixin
   * @return {domy}
   */
  extend: function(props) {
    debug('extend', props);
    if (typeof props != 'object') throw new Error('expected object');

    var child = Object.create(this);
    Object.assign(child, props);
    child.domy = this;

    // run optional creation hook
    if (child.initialize) child.initialize();

    return child;
  },

  // override this with a function
  // to prevent Errors in console
  // when tasks throw
  catch: null
};

/**
 * Schedules a new read/write
 * batch if one isn't pending.
 *
 * @private
 */

function scheduleFlush(domy) {
  if (!domy.scheduled) {
    domy.scheduled = true;
    domy.raf(flush.bind(null, domy));
    debug('flush scheduled');
  }
}

/**
 * Runs queued `read` and `write` tasks.
 *
 * Errors are caught and thrown by default.
 * If a `.catch` function has been defined
 * it is called instead.
 *
 * @private
 */
function flush(domy) {
  debug('flush');

  var writes = domy.writes;
  var deferred_reads = domy.deferred_reads;
  var error;

  try {
    debug('flushing writes', writes.length);
    runTasks(writes);
    debug('flushing deferred_reads', writes.length);
    runTasks(deferred_reads);
  } catch (e) { error = e; }

  domy.scheduled = false;

  // If the batch errored we may still have tasks queued
  if (writes.length || deferred_reads.length) scheduleFlush(domy);

  if (error) {
    debug('task errored', error.message);
    if (domy.catch) domy.catch(error);
    else throw error;
  }
}

/**
 * We run this inside a try catch
 * so that if any jobs error, we
 * are able to recover and continue
 * to flush the batch until it's empty.
 *
 * @private
 */

function runTasks(tasks) {
  debug('run tasks');
  var task; while ((task = tasks.shift())) task.fn.call(task.ctx);
}

/**
 * Remove an item from an Array.
 *
 * @param  {Array} array
 * @param  {*} item
 * @return {Boolean}
 */
function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

// There should never be more than
// one instance of `domy` in an app
var exports = win.domy = (win.domy || new domy()); // jshint ignore:line
module.exports = exports;

})(window);
    module = {};
    if(!ie_check(12)) {
        (function() {

	'use strict';

	var debug = 0 ? console.log.bind(console, '[strictdom]') : function() {};

	/**
	 * Crude webkit test.
	 *
	 * @type {Boolean}
	 */
	// var isWebkit = !!window.webkitURL;

	/**
	 * List of properties observed.
	 *
	 * @type {Object}
	 */
	var properties = {
	  prototype: {
	    Document: {
	      execCommand: Mutate,
	      elementFromPoint: Measure,
	      elementsFromPoint: Measure,
	      scrollingElement: Measure
	    },

	    Node: {
	      appendChild: {
	        type: Mutate,
	        test: function(dom, parent, args) {
	          var attached = isAttached(parent) || isAttached(args[0]);
	          if (attached && dom.not('mutate')) error(3, this.name);
	        }
	      },

	      insertBefore: {
	        type: Mutate,
	        test: function(dom, parent, args) {
	          var attached = isAttached(parent) || isAttached(args[0]);
	          if (attached && dom.not('mutate')) error(3, this.name);
	        }
	      },

	      removeChild: {
	        type: Mutate,
	        test: function(dom, parent, args) {
	          var attached = isAttached(parent) || isAttached(args[0]);
	          if (attached && dom.not('mutate')) error(3, this.name);
	        }
	      },

	      textContent: Mutate
	    },

	    Element: {
	      scrollIntoView: Mutate,
	      scrollBy: Mutate,
	      scrollTo: Mutate,
	      getClientRects: Measure,
	      getBoundingClientRect: Measure,
	      clientLeft: Measure,
	      clientWidth: Measure,
	      clientHeight: Measure,
	      scrollLeft: Accessor,
	      scrollTop: Accessor,
	      scrollWidth: Measure,
	      scrollHeight: Measure,
	      innerHTML: Mutate,
	      outerHTML: Mutate,
	      insertAdjacentHTML: Mutate,
	      remove: Mutate,
	      setAttribute: Mutate,
	      removeAttribute: Mutate,
	      className: Mutate,
	      classList: ClassList
	    },

	    HTMLElement: {
	      offsetLeft: Measure,
	      offsetTop: Measure,
	      offsetWidth: Measure,
	      offsetHeight: Measure,
	      offsetParent: Measure,
	      innerText: Accessor,
	      outerText: Accessor,
	      focus: Measure,
	      blur: Measure,
	      style: Style,

	      // `element.dataset` is hard to wrap.
	      // We could use `Proxy` but it's not
	      // supported in Chrome yet. Not too
	      // concerned as `data-` attributes are
	      // not often associated with render.
	      // dataset: DATASET
	    },

	    CharacterData: {
	      remove: Mutate,
	      data: Mutate
	    },

	    Range: {
	      getClientRects: Measure,
	      getBoundingClientRect: Measure
	    },

	    MouseEvent: {
	      layerX: Measure,
	      layerY: Measure,
	      offsetX: Measure,
	      offsetY: Measure
	    },

	    HTMLButtonElement: {
	      reportValidity: Measure
	    },

	    HTMLDialogElement: {
	      showModal: Mutate
	    },

	    HTMLFieldSetElement: {
	      reportValidity: Measure
	    },

	    HTMLImageElement: {
	      width: Accessor,
	      height: Accessor,
	      x: Measure,
	      y: Measure
	    },

	    HTMLInputElement: {
	      reportValidity: Measure
	    },

	    HTMLKeygenElement: {
	      reportValidity: Measure
	    },

	    SVGSVGElement: {
	      currentScale: Accessor
	    }
	  },

	  instance: {
	    window: {
	      getComputedStyle: {
	        type: Measure,

	        /**
	         * Throws when the Element is in attached
	         * and strictdom is not in the 'measure' phase.
	         *
	         * @param  {StrictDom} strictdom
	         * @param  {Window} win
	         * @param  {Object} args
	         */
	        test: function(strictdom, win, args) {
	          if (isAttached(args[0]) && strictdom.not('measure')) {
	            error(2, 'getComputedStyle');
	          }
	        }
	      },

	      // innerWidth: {
	      //   type: isWebkit ? Value : Measure,
	      //
	      //   /**
	      //    * Throws when the window is nested (in <iframe>)
	      //    * and StrictDom is not in the 'measure' phase.
	      //    *
	      //    * @param  {StrictDom} strictdom
	      //    */
	      //   test: function(strictdom) {
	      //     var inIframe = window !== window.top;
	      //     if (inIframe && strictdom.not('measure')) {
	      //       error(2, '`.innerWidth` (in iframe)');
	      //     }
	      //   }
	      // },
	      //
	      // innerHeight: {
	      //   type: isWebkit ? Value : Measure,
	      //
	      //   /**
	      //    * Throws when the window is nested (in <iframe>)
	      //    * and StrictDom is not in the 'measure' phase.
	      //    *
	      //    * @param  {StrictDom} strictdom
	      //    */
	      //   test: function(strictdom) {
	      //     var inIframe = window !== window.top;
	      //     if (inIframe && strictdom.not('measure')) {
	      //       error(2, '`.innerHeight` (in iframe)');
	      //     }
	      //   }
	      // },
	      //
	      // scrollX: isWebkit ? Value : Measure,
	      // scrollY: isWebkit ? Value : Measure,
	      scrollBy: Mutate,
	      scrollTo: Mutate,
	      scroll: Mutate,
	    }
	  }
	};

	/**
	 * The master controller for all properties.
	 *
	 * @param {Window} win
	 */
	function StrictDom(win) {
	  this.properties = [];
	  this._phase = null;
	  this.win = win;

	  this.createPrototypeProperties();
	  this.createInstanceProperties();
	}

	StrictDom.prototype = {

	  /**
	   * Set the current phase.
	   * @param  {[type]} value [description]
	   * @return {[type]}       [description]
	   */
	  phase: function(type, task) {
	    if (!arguments.length) return this._phase;
	    if (!this.knownPhase(type)) error(4, type);

	    var previous = this._phase;
	    this._phase = type;

	    if (typeof task != 'function') return;

	    var result = task();
	    this._phase = previous;
	    return result;
	  },

	  knownPhase: function(value) {
	    return !!~['measure', 'mutate', null].indexOf(value);
	  },

	  is: function(value) {
	    return this._phase === value;
	  },

	  not: function(value) {
	    return !this.is(value);
	  },

	  /**
	   * Enable strict mode.
	   *
	   * @public
	   */
	  enable: function() {
	    if (this.enabled) return false;
	    debug('enable');
	    var i = this.properties.length;
	    while (i--) this.properties[i].enable();
	    this.enabled = true;
	    return true;
	  },

	  /**
	   * Disable strict mode.
	   *
	   * @public
	   */
	  disable: function() {
	    if (!this.enabled) return false;
	    debug('disable');
	    var i = this.properties.length;
	    while (i--) this.properties[i].disable();
	    this.enabled = false;
	    this.phase(null);
	    return true;
	  },

	  /**
	   * Create wrappers for each of
	   * of the prototype properties.
	   *
	   * @private
	   */
	  createPrototypeProperties: function() {
	    debug('create prototype properties');
	    var props = properties.prototype;
	    for (var key in props) {
	      for (var name in props[key]) {
	        var object = this.win[key] && this.win[key].prototype;
	        if (!object || !object.hasOwnProperty(name)) continue;
	        this.properties.push(this.create(object, name, props[key][name]));
	      }
	    }
	  },

	  /**
	   * Create wrappers for each of
	   * of the instance properties.
	   *
	   * @private
	   */
	  createInstanceProperties: function() {
	    debug('create instance properties');
	    var props = properties.instance;
	    for (var key in props) {
	      for (var name in props[key]) {
	        var object = this.win[key];
	        if (!object || !object.hasOwnProperty(name)) continue;
	        this.properties.push(this.create(object, name, props[key][name]));
	      }
	    }
	  },

	  /**
	   * Create a wrapped `Property` that
	   * can be individually enabled/disabled.
	   *
	   * @param  {Object} object - the parent object (eg. Node.prototype)
	   * @param  {String} name - the property name (eg. 'appendChild')
	   * @param  {(constructor|Object)} config - from the above property definition
	   * @return {Property}
	   */
	  create: function(object, name, config) {
	    debug('create', name);
	    var Constructor = config.type || config;
	    return new Constructor(object, name, config, this);
	  }
	};

	/**
	 * Create a new `Property`.
	 *
	 * A wrapper around a property that observes
	 * usage, throwing errors when used in the
	 * incorrect phase.
	 *
	 * @param {Object} object - the parent object (eg. Node.prototype)
	 * @param {[type]} name - the property name (eg. 'appendChild')
	 * @param {(constructor|Object)} config - from the above definition
	 * @param {StrictDom} strictdom - injected as a dependency
	 */
	function Property(object, name, config, strictdom) {
	  debug('Property', name, config);

	  this.strictdom = strictdom;
	  this.object = object;
	  this.name = name;

	  var descriptor = this.getDescriptor();

	  // defaults can be overriden from config
	  if (typeof config == 'object') Object.assign(this, config);

	  this.descriptors = {
	    unwrapped: descriptor,
	    wrapped: this.wrap(descriptor)
	  };
	}

	Property.prototype = {

	  /**
	   * Get the property's descriptor.
	   *
	   * @return {Object}
	   * @private
	   */
	  getDescriptor: function() {
	    debug('get descriptor', this.name);
	    return Object.getOwnPropertyDescriptor(this.object, this.name);
	  },

	  /**
	   * Enable observation by replacing the
	   * current descriptor with the wrapped one.
	   *
	   * @private
	   */
	  enable: function() {
	    debug('enable', this.name);
	    Object.defineProperty(this.object, this.name, this.descriptors.wrapped);
	  },

	  /**
	   * Disable observation by replacing the
	   * current descriptor with the original one.
	   *
	   * @private
	   */
	  disable: function() {
	    debug('disable', this.name);
	    Object.defineProperty(this.object, this.name, this.descriptors.unwrapped);
	  },

	  // to be overwritten by subclass
	  wrap: function() {}
	};

	/**
	 * A wrapper for properties that measure
	 * geometry data from the DOM.
	 *
	 * Once a `Measure` property is enabled
	 * it can only be used when StrictDom
	 * is in the 'measure' phase, else it
	 * will throw.
	 *
	 * @constructor
	 * @extends Property
	 */
	function Measure() {
	  Property.apply(this, arguments);
	}

	Measure.prototype = extend(Property, {

	  /**
	   * Return a wrapped descriptor.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap measure', this.name);

	    var clone = Object.assign({}, descriptor);
	    var value = descriptor.value;
	    var get = descriptor.get;
	    var self = this;

	    if (typeof value == 'function') {
	      clone.value = function() {
	        debug('measure', self.name);
	        self.test(self.strictdom, this, arguments);
	        var v = value.apply(this, arguments);
	        //console.log(self.name, isAttached(this || window), v);
	        return v;
	      };
	    } else if (get) {
	      clone.get = function() {
	        debug('measure', self.name);
	        self.test(self.strictdom, this, arguments);
	        var v = get.apply(this, arguments);
	        //console.log(self.name, isAttached(this || window), v);
	        return v;
	      };
	    }

	    return clone;
	  },

	  /**
	   * Throws an Error if the element is attached
	   * and StrictDOM is not in the 'measure' phase.
	   *
	   * If methods/properties are used without
	   * a context (eg. `getComputedStyle()` instead
	   * of `window.getComputedStyle()`) we infer
	   * a `window` context.
	   *
	   * @param  {StrictDom} strictdom
	   * @param  {Node} ctx
	   */
	  test: function(strictdom, ctx) {
	    if (isAttached(ctx || window) && strictdom.not('measure')) {
	      error(2, this.name);
	    }
	  }
	});

	/**
	 * A wrapper for properties that mutate
	 * to the DOM, triggering style/reflow
	 * operations.
	 *
	 * Once a `Mutate` property is enabled
	 * it can only be used when StrictDom
	 * is in the 'measure' phase, else it
	 * will throw.
	 *
	 * @constructor
	 * @extends Property
	 */
	function Mutate() {
	  Property.apply(this, arguments);
	}

	Mutate.prototype = extend(Property, {

	  /**
	   * Return a wrapped descriptor.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap mutate', this.name);

	    var clone = Object.assign({}, descriptor);
	    var value = descriptor.value;
	    var self = this;

	    if (typeof value == 'function') {
	      clone.value = function() {
	        self.test(self.strictdom, this, arguments);
	        return value.apply(this, arguments);
	      };
	    } else if (descriptor.set) {
	      clone.set = function() {
	        self.test(self.strictdom, this, arguments);
	        return descriptor.set.apply(this, arguments);
	      };
	    }

	    return clone;
	  },

	  /**
	   * Throws an Error if the element is attached
	   * and StrictDOM is not in the 'mutate' phase.
	   *
	   * If methods/properties are used without
	   * a context (eg. `getComputedStyle()` instead
	   * of `window.getComputedStyle()`) we infer
	   * a `window` context.
	   *
	   * @param  {StrictDom} strictdom
	   * @param  {Node} ctx
	   */
	  test: function(strictdom, ctx) {
	    if (isAttached(ctx || window) && strictdom.not('mutate')) {
	      error(3, this.name);
	    }
	  }
	});

	/**
	 * A wrapper for 'accessor' (get/set) properties.
	 *
	 * An `Accessor` should be used to wrap
	 * properties that can both measure and mutate
	 * the DOM (eg. `element.scrollTop`).
	 *
	 * @constructor
	 * @extends Property
	 */
	function Accessor() {
	  Property.apply(this, arguments);
	}

	Accessor.prototype = extend(Property, {

	  /**
	   * Return a wrapped descriptor.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap accessor', this.name);

	    var clone = Object.assign({}, descriptor);
	    var get = descriptor.get;
	    var set = descriptor.set;
	    var self = this;

	    if (get) {
	      clone.get = function() {
	        self.testRead(self.strictdom, this, arguments);
	        return get.apply(this, arguments);
	      };
	    }

	    if (descriptor.set) {
	      clone.set = function() {
	        self.testWrite(self.strictdom, this, arguments);
	        return set.apply(this, arguments);
	      };
	    }

	    return clone;
	  },

	  testRead: Measure.prototype.test,
	  testWrite: Mutate.prototype.test
	});

	/**
	 * A wrapper for 'value' properties.
	 *
	 * A `Value` should be used to wrap special
	 * values that like `window.innerWidth`, which
	 * in Chrome (not Gecko) are not normal 'getter'
	 * functions, but magical flat getters.
	 *
	 * Value wrappers are a for very special cases.
	 *
	 * @constructor
	 * @extends Property
	 */
	function Value() {
	  Property.apply(this, arguments);
	}

	Value.prototype = extend(Property, {

	  /**
	   * Calling `Object.getOwnDescriptor()` can
	   * trigger a reflow as it returns the `value`
	   * of the property. So here we just
	   * return an empty object instead.
	   *
	   * @return {Object}
	   * @private
	   */
	  getDescriptor: function() {
	    return {};
	  },

	  /**
	   * Value wrappers are disabled by simply
	   * deleting them from the instance,
	   * revealing the original descriptor.
	   *
	   * @private
	   */
	  disable: function() {
	    delete this.object[this.name];
	  },

	  /**
	   * Return a wrapped descriptor.
	   *
	   * `Value` properties are actually on the
	   * instance of objects. To wrap them we need
	   * to replace them with a getter which
	   * deletes itself on access, call into the v8
	   * interceptor, and then add themselves back.
	   *
	   * This won't be fast, but these are rarely
	   * accessed so it should be fine.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap value');
	    var name = this.name;
	    var self = this;

	    descriptor.get = function() {
	      debug('get value', name);
	      self.test(self.strictdom, this, arguments);
	      self.disable();
	      var result = this[name];
	      self.enable();
	      return result;
	    };

	    return descriptor;
	  },

	  test: Measure.prototype.test
	});

	function Style() {
	  Property.apply(this, arguments);
	}

	Style.prototype = extend(Property, {
	  wrap: function(descriptor) {
	    debug('wrap style');
	    var strictdom = this.strictdom;
	    var clone = Object.assign({}, descriptor);
	    clone.get = function() { return new StrictStyle(this, strictdom); };
	    return clone;
	  }
	});

	function ClassList() {
	  Property.apply(this, arguments);
	}

	ClassList.prototype = extend(Property, {
	  wrap: function(descriptor) {
	    debug('wrap style');
	    var strictdom = this.strictdom;
	    var clone = Object.assign({}, descriptor);
	    var _get = clone.get;
	    clone.get = function() { return new StrictClassList(this, strictdom, _get); };
	    return clone;
	  }
	});

	function StrictStyle(el, strictdom) {
	  this.strictdom = strictdom;
	  this.el = el;
	}

	StrictStyle.prototype = {
	  _getter: getDescriptor(HTMLElement.prototype, 'style').get,
	  _get: function() {
	    return this._getter.call(this.el);
	  },

	  setProperty: function(key, value) {
	      if (isAttached(this.el)) {
	          domy.mutate(function() {
	            this._get()[key] = value;
	          }, this);
	        return value;
	      } else {
	        return this._get()[key] = value;
	      }
	  },

	  removeProperty: function(key) {
	      if (isAttached(this.el)) {
	          domy.mutate(function() {
	            return this._get().removeProperty(key);
	          }, this);
	        return this._get()[key];
	      } else {
	        return this._get().removeProperty(key);
	      }
	      
	      
	    var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	    if (illegal) error(1, 'style.' + key);
	  }
	};

	// dynamically construct prototype
	// from real element.style
	(function() {
	  var styles = document.createElement('div').style;
	  var proto = {};

	  for (var key in styles) {
	    if (styles[key] === '') {
	      Object.defineProperty(StrictStyle.prototype, key, {
	        get: getter(key),
	        set: setter(key)
	      });
	    }
	  }

	  [
	    'item',
	    'getPropertyValue',
	    'getPropertyCSSValue',
	    'getPropertyPriority'
	  ].forEach(function(method) {
	    StrictStyle.prototype[method] = caller(method);
	  });

	  function getter(key) {
	    return function() {
	      return this._get()[key];
	    };
	  }

	  function setter(key) {
	    return function(value) {
	      if (isAttached(this.el)) {
	          domy.mutate(function() {
	              this.setProperty(key, value);
	          }, this);
	       return value;
	      } else {
	       return this.setProperty(key, value);
	      }
	    };
	  }

	  function caller(key) {
	    return function() {
	      var style = this._get();
	      return style[key].apply(style, arguments);
	    };
	  }

	  return proto;
	})();

	function StrictClassList(el, strictdom, _getter) {
	  this.strictdom = strictdom;
	  this.el = el;
	  this._get = function() { return _getter.call(this.el); };
	  var classList =  this._get();
	  
	 // this._getter = getDescriptor(Element.prototype, 'classList').get,
	  for(var i = 0; i < classList.length; i++) {
	      this.push(classList.item(i));
	  }

	  this.add = function(className) {
	    if (isAttached(this.el)) {
	        domy.mutate(function() {
	            this._get().add(className);
	        }, this);
	    } else {
	        this._get().add(className);
	    }
	  },

	  this.contains = function(className) {
	    return this._get().contains(className);
	  },

	  this.remove = function(className) {
	    if (isAttached(this.el)) {
	        domy.mutate(function() {
	            this._get().remove(className);
	        }, this);
	    } else {
            this._get().remove(className);
	    }
	  },

	  this.toggle = function() {
	    var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	    if (illegal) error(1, 'class names');
	    var classList = this._get();
	    return classList.toggle.apply(classList, arguments);
	  };
	}
	
	StrictClassList.prototype = Object.create(Array.prototype);

	/**
	 * Utils
	 */

	function error(type) {
	  if(type == 1) {
	    console.log('Can only set ' + arguments[1] + ' during \'mutate\' phase');
	  }
	  /*
	  if(type == 2) {
	      console.log('Can only get ' + arguments[1] + ' during \'measure\' phase');
	  }
	  if(type == 3) {
	    console.log('Can only call `.' + arguments[1] + '()` during \'mutate\' phase');
	  }
	  if(type == 4) {
	    console.log('Invalid phase: ' + arguments[1]);
	  }
	  */
	}

	function getDescriptor(object, prop) {
	  return Object.getOwnPropertyDescriptor(object, prop);
	}

	function extend(parent, props) {
	  return Object.assign(Object.create(parent.prototype), props);
	}

	function isAttached(el) {
	  return el === window || document.contains(el);
	}

	/**
	 * Exports
	 */

	// Only ever allow one `StrictDom` per document
	var exports = window['strictdom'] = (window['strictdom'] || new StrictDom(window)); // jshint ignore:line

	module.exports = exports;

})();
    } else {
        window.strictdom = {enable:function() {},disable:function(){}};
    }
    
    console.log('main');
    var use_domy = true;
    var _strictdom = strictdom;
    domy.init = function() {
        if(use_domy) {
            _strictdom.enable();
        }
    }
    
    domy.deinit = function() {
        _strictdom.disable();
    }
    
    domy.off = function(f, ctx, m) {
        var ds = _strictdom.disable();
        if(!m) {
            f.call(ctx);
            if(ds) {
                _strictdom.enable();
            }
        } else {
            f.call(ctx, function() {
                if(ds) {
                    _strictdom.enable();
                }
                m.apply(this, arguments);
            });
        }
    }
    delete window.strictdom;
    domy.init();
    //$.site('enable debug');
    
    var pf = jQuery.Animation.prefilters;
    var slideUp = jQuery.fn.slideUp;
    if(slideUp) {
        jQuery.fn.slideUp = function() {
            var aidx = arguments.length == 3 ? 2 : 1;
            var a = arguments[aidx];
            
            arguments[aidx] = function() {
                domy.off(function() {
                    $(this).css('display', 'none');
                }, this);
                if(a) {
                    a.apply(this, arguments);
                }
            }
            slideUp.apply(this, arguments);
        }
    }
    if(pf) {
        var f = pf[0];
        pf[0] = function() {
            var a = arguments;
            domy.off(function() {
                f.apply(this, a);
            }, this);
        }
    }
}
 });