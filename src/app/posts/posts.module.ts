import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogDashboardComponent } from './blog-dashboard/blog-dashboard.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PostService } from './post.service';
import { ShareModule } from '../share/share.module';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'blogDashbourd', component: BlogDashboardComponent, canActivate: [AuthGuard] },
  { path: '404', component: BlogListComponent },
  { path: '**', redirectTo: 'blog' }

]

@NgModule({
  imports: [
    ShareModule, RouterModule.forChild(routes)
  ],
  declarations: [BlogDashboardComponent, BlogListComponent, BlogDetailsComponent],
  providers: [PostService]
})
export class PostsModule { }